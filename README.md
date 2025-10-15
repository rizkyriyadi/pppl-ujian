# Ujian Online - SDN TUGU 1

Platform ujian online untuk siswa SDN TUGU 1. Website ini dibuat dengan Next.js 15, Firebase, dan Tailwind CSS.

## Features

- Login dengan NISN
- Dashboard ujian
- Interface pengerjaan ujian dengan timer
- Auto-submit ketika waktu habis
- Hasil ujian dengan scoring otomatis
- History hasil ujian
- Responsive design

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4
- **Backend/Database**: Firebase (Firestore + Authentication)
- **Hosting**: Vercel (Free Tier)

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd ujian
npm install
```

### 2. Setup Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** > Sign-in method > Email/Password
3. Enable **Firestore Database**
4. Copy Firebase config dari Project Settings > General > Your apps > Web app

### 3. Environment Variables

Buat file `.env.local` di root project dan isi dengan config Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Firebase Security Rules

Di Firebase Console > Firestore Database > Rules, paste rules berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read: if request.auth != null && request.auth.uid == studentId;
      allow write: if false;
    }

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

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 6. Setup Database Structure

Lihat `FIREBASE_STRUCTURE.md` untuk detail struktur database.

Untuk membuat data dummy, gunakan Firebase Console untuk menambahkan:
- Collection `exams` dengan sample ujian
- Users di Authentication dengan format email: `{nisn}@student.sdntugu1.sch.id`

## Deploy to Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables di Vercel project settings
4. Deploy!

## Project Structure

```
src/
├── app/
│   ├── dashboard/         # Dashboard list ujian
│   ├── exam/[id]/        # Interface pengerjaan ujian
│   ├── login/            # Halaman login
│   ├── results/          # History hasil ujian
│   ├── layout.tsx
│   └── page.tsx          # Root redirect
├── components/           # Reusable components (future)
└── lib/
    ├── firebase.ts       # Firebase config
    ├── AuthContext.tsx   # Auth state management
    └── types.ts          # TypeScript types
```

## Next Steps

- **Admin Panel**: Buat project terpisah untuk CRUD ujian dan melihat hasil siswa
- **AI Integration**: Integrate Google Gemini API di admin panel untuk analisis hasil
- **Domain**: Beli domain murah (under 20k) dan connect ke Vercel

## Cost Breakdown

- Next.js hosting: **FREE** (Vercel)
- Firebase: **FREE** (Spark plan, cukup untuk SD)
- Domain: **~20k/year** (sekali pakai, tidak perlu perpanjang)
- **Total: ~20k untuk 1 tahun**

---

Built for SDN TUGU 1
