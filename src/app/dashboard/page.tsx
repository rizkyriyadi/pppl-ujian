'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import type { Exam, Question } from '@/lib/types';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loadingExams, setLoadingExams] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadExams();
    }
  }, [user]);

  const loadExams = async () => {
    try {
      const examsRef = collection(db, 'exams');
      const q = query(examsRef, where('isActive', '==', true));
      const querySnapshot = await getDocs(q);

      const examsData: Exam[] = [];

      for (const docSnap of querySnapshot.docs) {
        const examData = docSnap.data();

        // Load questions for this exam
        const questionsRef = collection(db, 'questions');
        const qQuestions = query(
          questionsRef,
          where('examId', '==', docSnap.id)
        );
        const questionsSnapshot = await getDocs(qQuestions);

        const questions = questionsSnapshot.docs
          .map(qDoc => ({
            id: qDoc.id,
            ...qDoc.data()
          } as Question))
          .sort((a, b) => a.questionNumber - b.questionNumber);

        examsData.push({
          id: docSnap.id,
          ...examData,
          questions,
          createdAt: examData.createdAt?.toDate() || new Date(),
        } as Exam);
      }

      setExams(examsData);
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setLoadingExams(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Ujian Online</h1>
            <p className="text-sm text-gray-600">SDN TUGU 1</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Daftar Ujian
          </h2>
          <p className="text-gray-600">
            Pilih ujian yang ingin dikerjakan
          </p>
        </div>

        {loadingExams ? (
          <div className="text-center py-12 text-gray-600">
            Memuat daftar ujian...
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <p className="text-gray-600">Belum ada ujian yang tersedia</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {exam.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {exam.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{exam.totalQuestions} soal</span>
                    <span>{exam.duration} menit</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/exam/${exam.id}`)}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Mulai Ujian
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Results Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/results')}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Lihat Hasil Ujian
          </button>
        </div>
      </main>
    </div>
  );
}
