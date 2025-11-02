'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [nisn, setNisn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert NISN to email format for Firebase auth
      // Extract first name from password (password format: firstname + 4 digit nisn)
      // We need to figure out the first name by querying the database
      // But for now, we'll ask user to provide their name or use a lookup
      
      // For now, construct email as: {password without last 4 digits}.{last 4 digits nisn}@students.pppl.id
      // Since password = firstname + last4nisn, we can extract firstname from password
      const lastFourNisn = nisn.slice(-4);
      // Remove the last 4 digits from password to get the first name
      const firstName = password.slice(0, -4);
      const email = `${firstName}.${lastFourNisn}@students.pppl.id`;
      
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('NISN atau password salah');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Ujian Online
            </h1>
            <p className="text-gray-600">
              SDN TUGU 1
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="nisn" className="block text-sm font-medium text-gray-700 mb-1.5">
                NISN
              </label>
              <input
                type="text"
                id="nisn"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan NISN"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="mb-2">Pastikan NISN dan password sudah benar</p>
            <p className="text-xs text-gray-400">
              Password format: Nama depan (lowercase) + 4 digit terakhir NISN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
