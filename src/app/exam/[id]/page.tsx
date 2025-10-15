'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Exam, Question } from '@/lib/types';

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

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && examId) {
      loadExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, examId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const loadExam = async () => {
    try {
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
        setTimeLeft(fullExamData.duration * 60);
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

  const handleSubmit = async () => {
    if (submitting) return;

    if (!confirm('Apakah kamu yakin ingin mengumpulkan jawaban?')) {
      return;
    }

    setSubmitting(true);

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
      await addDoc(collection(db, 'examAttempts'), {
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

      router.push(`/results/${exam.id}?score=${score}`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Memuat ujian...</div>
      </div>
    );
  }

  if (!exam) {
    return null;
  }

  const question = exam.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / exam.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-semibold text-gray-900">{exam.title}</h1>
            <div className={`text-lg font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Soal {currentQuestion + 1} dari {exam.totalQuestions}
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">Pertanyaan {currentQuestion + 1}</div>
            <p className="text-lg text-gray-900 leading-relaxed">
              {question.questionText}
            </p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  answers[question.id] === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === index}
                  onChange={() => handleAnswer(question.id, index)}
                  className="mt-1 mr-3 w-4 h-4 text-blue-600"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>

          <div className="text-sm text-gray-600">
            Terjawab: {Object.keys(answers).length} dari {exam.totalQuestions}
          </div>

          {currentQuestion === exam.totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {submitting ? 'Mengumpulkan...' : 'Kumpulkan'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(exam.totalQuestions - 1, prev + 1))}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
