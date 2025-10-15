'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SingleResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { text: 'Luar Biasa!', color: 'text-green-600' };
    if (score >= 60) return { text: 'Cukup Baik', color: 'text-yellow-600' };
    return { text: 'Perlu Ditingkatkan', color: 'text-red-600' };
  };

  const scoreNum = score ? parseInt(score) : 0;
  const message = getScoreMessage(scoreNum);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <svg
                className="w-16 h-16 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Ujian Selesai
            </h1>
            <p className="text-gray-600">Jawaban berhasil dikumpulkan</p>
          </div>

          <div className="mb-8 py-6 border-y border-gray-200">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {scoreNum}
            </div>
            <div className={`text-lg font-semibold ${message.color}`}>
              {message.text}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/results')}
              className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Lihat Semua Hasil
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
