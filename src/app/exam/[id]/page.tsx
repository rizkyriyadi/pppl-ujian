'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Exam, Question } from '@/lib/types';
import { Dialog } from '@/components/ui/Dialog';
import { CheckCircle, Clock, LayoutGrid, ChevronLeft, ChevronRight, Save } from 'lucide-react';

export default function ExamPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loadingExam, setLoadingExam] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);
  const [showQuestionMap, setShowQuestionMap] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load exam and restore session
  useEffect(() => {
    if (user && examId) {
      loadExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, examId]);

  // Save progress to localStorage
  useEffect(() => {
    if (exam && user) {
      const sessionKey = `exam_session_${user.uid}_${examId}`;
      const sessionData = {
        answers,
        currentQuestion,
        timeLeft,
        lastUpdated: Date.now()
      };
      localStorage.setItem(sessionKey, JSON.stringify(sessionData));
    }
  }, [answers, currentQuestion, timeLeft, exam, user, examId]);

  // Prevent accidental leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !submitting) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitting]);

  const loadExam = async () => {
    try {
      // Check for existing attempts first
      if (user) {
        const attemptsRef = collection(db, 'examAttempts');
        const qAttempts = query(
          attemptsRef,
          where('studentId', '==', user.uid),
          where('examId', '==', examId)
        );
        const attemptsSnapshot = await getDocs(qAttempts);

        if (!attemptsSnapshot.empty) {
          const attemptId = attemptsSnapshot.docs[0].id;
          router.replace(`/results/${examId}?attemptId=${attemptId}`);
          return;
        }
      }

      const examDoc = await getDoc(doc(db, 'exams', examId));
      if (examDoc.exists()) {
        const examData = examDoc.data();

        // Load questions for this exam
        const questionsRef = collection(db, 'questions');
        const q = query(
          questionsRef,
          where('examId', '==', examId)
        );
        const questionsSnapshot = await getDocs(q);

        const questions = questionsSnapshot.docs
          .map(qDoc => ({
            id: qDoc.id,
            ...qDoc.data()
          } as Question))
          .sort((a, b) => a.questionNumber - b.questionNumber);

        const fullExamData = {
          id: examDoc.id,
          ...examData,
          questions,
          createdAt: examData.createdAt?.toDate() || new Date(),
        } as Exam;

        setExam(fullExamData);

        // Restore session if exists
        if (user) {
          const sessionKey = `exam_session_${user.uid}_${examId}`;
          const savedSession = localStorage.getItem(sessionKey);
          if (savedSession) {
            const { answers: savedAnswers, currentQuestion: savedQuestion, timeLeft: savedTime } = JSON.parse(savedSession);
            setAnswers(savedAnswers || {});
            setCurrentQuestion(savedQuestion || 0);
            // Only restore time if it's reasonable (e.g. within exam duration)
            if (savedTime > 0 && savedTime <= fullExamData.duration * 60) {
              setTimeLeft(savedTime);
            } else {
              setTimeLeft(fullExamData.duration * 60);
            }
          } else {
            setTimeLeft(fullExamData.duration * 60);
          }
        }
      } else {
        alert('Ujian tidak ditemukan');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error loading exam:', error);
    } finally {
      setLoadingExam(false);
    }
  };

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setIsSubmitConfirmOpen(false);

    try {
      if (!exam || !user) return;

      // Get student data
      const studentDoc = await getDoc(doc(db, 'users', user.uid));
      const studentData = studentDoc.exists() ? studentDoc.data() : null;

      // Calculate score
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let unanswered = 0;

      exam.questions.forEach(question => {
        if (answers[question.id] !== undefined) {
          if (answers[question.id] === question.correctAnswer) {
            correctAnswers++;
          } else {
            incorrectAnswers++;
          }
        } else {
          unanswered++;
        }
      });

      const score = Math.round((correctAnswers / exam.totalQuestions) * 100);
      const isPassed = score >= exam.passingScore;

      // Calculate time spent
      const timeSpent = exam.duration * 60 - timeLeft;

      // Save attempt to Firestore
      const attemptRef = await addDoc(collection(db, 'examAttempts'), {
        examId: exam.id,
        examTitle: exam.title,
        studentId: user.uid,
        studentName: studentData?.name || user.email || 'Unknown',
        studentClass: studentData?.class || 'N/A',
        answers,
        score,
        totalQuestions: exam.totalQuestions,
        correctAnswers,
        incorrectAnswers,
        unanswered,
        timeSpent,
        isPassed,
        startedAt: serverTimestamp(),
        submittedAt: serverTimestamp(),
        status: 'completed'
      });

      // Clear local storage
      localStorage.removeItem(`exam_session_${user.uid}_${examId}`);

      router.push(`/results/${exam.id}?attemptId=${attemptRef.id}`);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Terjadi kesalahan saat mengumpulkan jawaban');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading || loadingExam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!exam) return null;

  const question = exam.questions[currentQuestion];
  const progress = ((Object.keys(answers).length) / exam.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-sm font-semibold text-gray-900 truncate max-w-[50%]">
              {exam.title}
            </h1>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono font-medium ${timeLeft < 300 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'
              }`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowQuestionMap(!showQuestionMap)}
              className={`p-2 rounded-lg transition-colors ${showQuestionMap ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
              title="Peta Soal"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex gap-6">
        {/* Question Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                {currentQuestion + 1}
              </span>
              {answers[question.id] !== undefined && (
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Terjawab
                </span>
              )}
            </div>

            <p className="text-lg text-gray-900 leading-relaxed mb-8">
              {question.questionText}
            </p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all duration-200 group ${answers[question.id] === index
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                >
                  <div className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${answers[question.id] === index
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300 group-hover:border-blue-400'
                    }`}>
                    {answers[question.id] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm ${answers[question.id] === index ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
                    {option}
                  </span>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={answers[question.id] === index}
                    onChange={() => handleAnswer(question.id, index)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            {currentQuestion === exam.totalQuestions - 1 ? (
              <button
                onClick={() => setIsSubmitConfirmOpen(true)}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all shadow-sm font-medium"
              >
                <Save className="w-4 h-4" />
                {submitting ? 'Menyimpan...' : 'Selesai Ujian'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(exam.totalQuestions - 1, prev + 1))}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm font-medium"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Map Sidebar (Desktop) */}
        <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${showQuestionMap ? 'translate-x-0' : 'translate-x-full'
          } lg:relative lg:transform-none lg:w-72 lg:shadow-none lg:bg-transparent lg:block`}>
          <div className="h-full flex flex-col bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:h-[calc(100vh-140px)] lg:sticky lg:top-24">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center lg:hidden">
              <h3 className="font-semibold text-gray-900">Peta Soal</h3>
              <button onClick={() => setShowQuestionMap(false)} className="text-gray-500">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100 hidden lg:block">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Peta Soal
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setShowQuestionMap(false);
                    }}
                    className={`aspect-square rounded-lg text-sm font-medium flex items-center justify-center transition-all ${currentQuestion === idx
                      ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                      : answers[q.id] !== undefined
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 lg:rounded-b-xl">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                  <span>Terjawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-50 border border-gray-200 rounded"></div>
                  <span>Belum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>Sekarang</span>
                </div>
              </div>

              <button
                onClick={() => setIsSubmitConfirmOpen(true)}
                className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Kumpulkan
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {showQuestionMap && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setShowQuestionMap(false)}
        />
      )}

      <Dialog
        isOpen={isSubmitConfirmOpen}
        onClose={() => setIsSubmitConfirmOpen(false)}
        title="Kumpulkan Jawaban?"
        description={`Anda telah menjawab ${Object.keys(answers).length} dari ${exam.totalQuestions} soal. Apakah Anda yakin ingin mengakhiri ujian ini?`}
        footer={
          <>
            <button
              onClick={() => setIsSubmitConfirmOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Periksa Lagi
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
            >
              Ya, Kumpulkan
            </button>
          </>
        }
      />
    </div>
  );
}
