'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ExamAttempt } from '@/lib/types';

export default function ResultsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadAttempts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadAttempts = async () => {
    try {
      if (!user) return;

      const attemptsRef = collection(db, 'examAttempts');
      const q = query(
        attemptsRef,
        where('studentId', '==', user.uid),
        orderBy('submittedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const attemptsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startedAt: doc.data().startedAt?.toDate() || new Date(),
        submittedAt: doc.data().submittedAt?.toDate() || new Date(),
      })) as ExamAttempt[];

      setAttempts(attemptsData);
    } catch (error) {
      console.error('Error loading attempts:', error);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Hasil Ujian</h1>
            <p className="text-sm text-gray-600">Riwayat ujian yang telah dikerjakan</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Kembali
          </button>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loadingAttempts ? (
          <div className="text-center py-12 text-gray-600">
            Memuat hasil ujian...
          </div>
        ) : attempts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <p className="text-gray-600 mb-4">Belum ada hasil ujian</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Mulai Ujian
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {(attempt as { examTitle?: string }).examTitle || 'Ujian'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {attempt.submittedAt.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg border ${getScoreBg(attempt.score)}`}>
                    <div className={`text-2xl font-bold ${getScoreColor(attempt.score)}`}>
                      {attempt.score}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-600">Total Soal</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {attempt.totalQuestions}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Jawaban Benar</div>
                    <div className="text-lg font-semibold text-green-600">
                      {attempt.correctAnswers}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Jawaban Salah</div>
                    <div className="text-lg font-semibold text-red-600">
                      {attempt.totalQuestions - attempt.correctAnswers}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
