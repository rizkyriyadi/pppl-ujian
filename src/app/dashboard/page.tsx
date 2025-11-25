'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import type { Exam, Question, Student } from '@/lib/types';
import { Dialog } from '@/components/ui/Dialog';
import { BookOpen, Clock, HelpCircle, LogOut, LayoutDashboard, User as UserIcon, GraduationCap, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [completedExamIds, setCompletedExamIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadUserData();
      loadExamsAndAttempts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    try {
      const studentDoc = await getDoc(doc(db, 'users', user.uid));
      if (studentDoc.exists()) {
        setStudentData(studentDoc.data() as Student);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  const loadExamsAndAttempts = async () => {
    if (!user) return;
    try {
      // Load Exams
      const examsRef = collection(db, 'exams');
      const qExams = query(examsRef, where('isActive', '==', true));
      const examsSnapshot = await getDocs(qExams);

      const examsData: Exam[] = [];

      for (const docSnap of examsSnapshot.docs) {
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

      // Load Attempts
      const attemptsRef = collection(db, 'examAttempts');
      const qAttempts = query(attemptsRef, where('studentId', '==', user.uid));
      const attemptsSnapshot = await getDocs(qAttempts);

      const completedIds = new Set<string>();
      attemptsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        completedIds.add(data.examId);
      });
      setCompletedExamIds(completedIds);

    } catch (error) {
      console.error('Error loading data:', error);
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

  const handleStartClick = (exam: Exam) => {
    setSelectedExam(exam);
    setIsConfirmOpen(true);
  };

  const confirmStartExam = () => {
    if (selectedExam) {
      router.push(`/exam/${selectedExam.id}`);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ujian Online</h1>
              <p className="text-xs text-gray-500 font-medium">SDN TUGU 1</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {studentData && (
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-semibold text-gray-900">{studentData.name}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Kelas {studentData.class}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section (Mobile) */}
        {studentData && (
          <div className="md:hidden mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{studentData.name}</h2>
              <p className="text-sm text-gray-500">Kelas {studentData.class}</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            Daftar Ujian
          </h2>
          <p className="text-gray-600">
            Pilih ujian yang tersedia di bawah ini untuk mulai mengerjakan.
          </p>
        </div>

        {loadingExams ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-64 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
                <div className="mt-auto h-10 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada ujian</h3>
            <p className="text-gray-500">Saat ini belum ada ujian yang tersedia untuk dikerjakan.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => {
              const isCompleted = completedExamIds.has(exam.id);
              return (
                <div
                  key={exam.id}
                  className={`group bg-white rounded-xl border p-6 transition-all duration-300 flex flex-col h-full ${isCompleted
                      ? 'border-gray-200 bg-gray-50/50'
                      : 'border-gray-200 hover:shadow-lg hover:border-blue-200'
                    }`}
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-lg font-bold transition-colors line-clamp-2 ${isCompleted ? 'text-gray-600' : 'text-gray-900 group-hover:text-blue-600'
                        }`}>
                        {exam.title}
                      </h3>
                      {isCompleted ? (
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Selesai
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap">
                          Aktif
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {exam.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-blue-500" />
                        <span>{exam.totalQuestions} Soal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{exam.duration} Menit</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => !isCompleted && handleStartClick(exam)}
                    disabled={isCompleted}
                    className={`mt-auto w-full py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-sm flex items-center justify-center gap-2 ${isCompleted
                        ? 'bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed'
                        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md active:scale-[0.98]'
                      }`}
                  >
                    {isCompleted ? 'Sudah Dikerjakan' : 'Mulai Ujian'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Results Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/results')}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            Lihat Riwayat Hasil Ujian
          </button>
        </div>
      </main>

      <Dialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Mulai Ujian?"
        description={`Anda akan memulai ujian "${selectedExam?.title}". Pastikan koneksi internet Anda stabil. Waktu akan berjalan segera setelah Anda menekan tombol Mulai.`}
        footer={
          <>
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              onClick={confirmStartExam}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Mulai Sekarang
            </button>
          </>
        }
      />
    </div>
  );
}
