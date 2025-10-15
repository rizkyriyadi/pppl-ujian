# Quick Start Guide

## Setup dalam 5 Menit

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Create a project"
3. Nama project: `ujian-sdnpgs1` (atau terserah)
4. Disable Google Analytics (opsional, buat simple)
5. Klik "Create project"

### 3. Enable Firebase Services

**Authentication:**
1. Di sidebar, klik "Authentication"
2. Klik "Get started"
3. Pilih "Email/Password"
4. Enable switch untuk "Email/Password"
5. Save

**Firestore:**
1. Di sidebar, klik "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih location terdekat (asia-southeast2 untuk Indonesia)
5. Klik "Enable"

### 4. Get Firebase Config

1. Di Firebase Console, klik icon gear (⚙️) > Project settings
2. Scroll ke bawah ke section "Your apps"
3. Klik icon web (</>)
4. Register app, nama: "Ujian Online"
5. Copy nilai dari `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### 5. Update .env.local

Buka file `.env.local` di root project, replace dengan values dari step 4:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ujian-sdnpgs1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ujian-sdnpgs1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ujian-sdnpgs1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 6. Setup Firestore Security Rules

1. Di Firebase Console > Firestore Database
2. Klik tab "Rules"
3. Replace semua dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /exams/{examId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /examAttempts/{attemptId} {
      allow read: if request.auth != null && resource.data.studentId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.studentId == request.auth.uid;
      allow update, delete: if false;
    }
  }
}
```

4. Klik "Publish"

### 7. Add Sample Data

**Buat user test:**
1. Firebase Console > Authentication > Users
2. Klik "Add user"
3. Email: `1234567890@student.sdnpgs1.sch.id`
4. Password: `password123`
5. Klik "Add user"

**Buat sample ujian:**
1. Firebase Console > Firestore Database > Data
2. Klik "Start collection"
3. Collection ID: `exams`
4. Add document dengan data dari `SAMPLE_DATA.md`

### 8. Run Development Server

```bash
npm run dev
```

Buka http://localhost:3000

### 9. Test Login

- NISN: `1234567890`
- Password: `password123`

---

## Deploy ke Vercel

### Option 1: Via GitHub (Recommended)

1. Push ke GitHub:
```bash
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Import di Vercel:
   - Buka [vercel.com](https://vercel.com)
   - Klik "Add New" > "Project"
   - Import dari GitHub
   - Add environment variables (copy dari .env.local)
   - Klik "Deploy"

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts, add env vars when asked
```

---

## Troubleshooting

**Error: Firebase not initialized**
- Pastikan .env.local sudah diisi dengan benar
- Restart dev server (`npm run dev`)

**Error: Permission denied Firestore**
- Cek Firestore Rules sudah di-publish
- Pastikan user sudah login

**Error: Login failed**
- Pastikan Authentication Email/Password enabled
- Cek format email: `{nisn}@student.sdnpgs1.sch.id`

**Build error**
- Run `npm run build` untuk cek errors
- Pastikan semua dependencies terinstall

---

## Next Steps

Setelah website siswa jalan:

1. **Buat Admin Panel** - Project terpisah untuk CRUD ujian
2. **Integrate Gemini AI** - Untuk analisis hasil ujian
3. **Setup Custom Domain** - Beli domain murah (~20k)

Lihat `README.md` untuk detail lengkap.
