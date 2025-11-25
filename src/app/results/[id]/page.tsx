'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Question } from '@/lib/types';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, BookOpen } from 'lucide-react';

interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  answers: { [key: string]: number };
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeSpent: number;
  submittedAt: Timestamp;
}

export default function SingleResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get('attemptId');
  const scoreParam = searchParams.get('score'); // Fallback for old links

  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (attemptId) {
      loadResult();
    } else if (scoreParam) {
      // Fallback for simple score display if no attemptId
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId, scoreParam]);

  const loadResult = async () => {
    try {
      if (!attemptId) return;

      const attemptDoc = await getDoc(doc(db, 'examAttempts', attemptId));
      if (attemptDoc.exists()) {
        const attemptData = attemptDoc.data() as ExamAttempt;
        setAttempt(attemptData);

        // Load questions to show details
        const questionsRef = collection(db, 'questions');
        const q = query(
          questionsRef,
          where('examId', '==', attemptData.examId)
        );
        const questionsSnapshot = await getDocs(q);

        const questionsData = questionsSnapshot.docs
          .map(qDoc => ({
            id: qDoc.id,
            ...qDoc.data()
          } as Question))
          .sort((a, b) => a.questionNumber - b.questionNumber);

        setQuestions(questionsData);
      }
    } catch (error) {
      console.error('Error loading result:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { text: 'Luar Biasa!', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (score >= 60) return { text: 'Cukup Baik', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { text: 'Perlu Ditingkatkan', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const score = attempt ? attempt.score : (scoreParam ? parseInt(scoreParam) : 0);
  const message = getScoreMessage(score);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Score Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8 text-center border-b border-gray-100">
            <div className={`inline-flex p-4 rounded-full mb-6 ${message.bg}`}>
              {score >= 80 ? (
                <CheckCircle className={`w-12 h-12 ${message.color}`} />
              ) : score >= 60 ? (
                <AlertCircle className={`w-12 h-12 ${message.color}`} />
              ) : (
                <XCircle className={`w-12 h-12 ${message.color}`} />
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {attempt ? attempt.examTitle : 'Ujian Selesai'}
            </h1>
            <p className="text-gray-600 mb-8">
              {attempt ? 'Berikut adalah hasil pengerjaan Anda' : 'Jawaban berhasil dikumpulkan'}
            </p>

            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-6xl font-bold text-gray-900">{score}</span>
              <span className="text-xl text-gray-400 font-medium">/100</span>
            </div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${message.bg} ${message.color}`}>
              {message.text}
            </div>
          </div>

          {attempt && (
            <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/50">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{attempt.correctAnswers}</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Benar</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{attempt.incorrectAnswers}</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Salah</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">{attempt.unanswered}</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Kosong</div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Breakdown */}
        {attempt && questions.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Pembahasan Soal
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {questions.map((question, index) => {
                const userAnswer = attempt.answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                const isUnanswered = userAnswer === undefined;

                return (
                  <div key={question.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${isCorrect
                          ? 'bg-green-100 text-green-700'
                          : isUnanswered
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-red-100 text-red-700'
                          }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <p className="text-gray-900 font-medium">
                          {question.questionText}
                        </p>

                        <div className="space-y-2">
                          {question.options.map((option, optIdx) => {
                            const isSelected = userAnswer === optIdx;
                            const isTheCorrectAnswer = question.correctAnswer === optIdx;

                            let optionStyle = 'border-gray-200 text-gray-600';
                            if (isTheCorrectAnswer) {
                              optionStyle = 'border-green-200 bg-green-50 text-green-700 font-medium';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'border-red-200 bg-red-50 text-red-700';
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`flex items-center justify-between p-3 border rounded-lg text-sm ${optionStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isTheCorrectAnswer ? 'border-green-600 bg-green-600 text-white' :
                                    isSelected ? 'border-red-600 bg-red-600 text-white' :
                                      'border-gray-300'
                                    }`}>
                                    {(isTheCorrectAnswer || isSelected) && (
                                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                  </div>
                                  <span>{option}</span>
                                </div>
                                {isTheCorrectAnswer && (
                                  <span className="text-xs font-bold text-green-600 uppercase">Jawaban Benar</span>
                                )}
                                {isSelected && !isCorrect && (
                                  <span className="text-xs font-bold text-red-600 uppercase">Jawaban Anda</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </button>
          <button
            onClick={() => router.push('/results')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            Lihat Semua Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
