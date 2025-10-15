# Project Structure

```
ujian/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard list ujian
│   │   ├── exam/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Interface pengerjaan ujian dengan timer
│   │   ├── login/
│   │   │   └── page.tsx          # Halaman login siswa
│   │   ├── results/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Detail single result
│   │   │   └── page.tsx          # History semua hasil ujian
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout dengan AuthProvider
│   │   └── page.tsx              # Root redirect page
│   │
│   ├── components/               # (Future: reusable components)
│   │
│   └── lib/
│       ├── AuthContext.tsx       # Auth state management
│       ├── firebase.ts           # Firebase configuration
│       └── types.ts              # TypeScript interfaces
│
├── public/                       # Static assets
│
├── .env.local                    # Environment variables (Firebase config)
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── tailwind.config.ts            # (Not created - using Tailwind 4)
│
├── FIREBASE_STRUCTURE.md         # Database schema documentation
├── SAMPLE_DATA.md                # Sample data untuk testing
├── QUICKSTART.md                 # Quick setup guide
└── README.md                     # Main documentation
```

## Key Files Overview

### Core Application Files

**src/app/login/page.tsx**
- Login form dengan NISN + password
- Converts NISN to email format untuk Firebase auth
- Redirects ke dashboard setelah login

**src/app/dashboard/page.tsx**
- Menampilkan list ujian yang aktif
- Fetch dari Firestore collection `exams`
- Button untuk mulai ujian dan lihat hasil

**src/app/exam/[id]/page.tsx**
- Interface pengerjaan ujian
- Timer countdown (auto-submit when time's up)
- Navigation antar soal
- Submit jawaban ke Firestore

**src/app/results/page.tsx**
- History semua hasil ujian siswa
- Fetch dari collection `examAttempts`
- Tampilkan score, correct/incorrect answers

**src/app/results/[id]/page.tsx**
- Detail hasil single ujian
- Menampilkan score dan feedback

### Library Files

**src/lib/firebase.ts**
- Initialize Firebase app
- Export `auth` dan `db` instances

**src/lib/AuthContext.tsx**
- React Context untuk auth state
- Provides `user` dan `loading` state
- Used across all protected routes

**src/lib/types.ts**
- TypeScript interfaces untuk:
  - Student
  - Question
  - Exam
  - ExamAttempt

### Configuration Files

**.env.local**
- Firebase configuration (API keys, project ID, etc.)
- NOT committed to git

**package.json**
- Dependencies: next, react, firebase, tailwindcss
- Scripts: dev, build, start, lint

**tsconfig.json**
- TypeScript configuration
- Path aliases: `@/` maps to `src/`

## Pages Flow

```
/ (root)
  ↓
  → Checks auth
    → If logged in → /dashboard
    → If not → /login

/login
  ↓
  → Login form
  → Success → /dashboard

/dashboard
  ↓
  → List of active exams
  → Click exam → /exam/[id]
  → View results → /results

/exam/[id]
  ↓
  → Load exam from Firestore
  → Display questions with timer
  → Submit → /results/[id]?score=X

/results
  ↓
  → Show all exam attempts history
  → Back to dashboard

/results/[id]
  ↓
  → Show single exam result
  → Back to dashboard or all results
```

## Data Flow

```
Firebase Auth
  ↓
  → Students login dengan NISN@student.sdnpgs1.sch.id
  ↓
  → AuthContext provides user state

Firestore Collections:
  ↓
  exams → Read by all authenticated users
  ↓
  examAttempts → Created by students, readable by owner
```

## Styling

- **Tailwind CSS 4** untuk semua styling
- Design: Clean, minimalist, professional
- Colors: Blue primary (#2563eb), gray neutrals
- Responsive: Mobile-first approach
- No icons, no emojis, no neon colors

## Security

- Firestore Security Rules prevent direct writes
- Students can only:
  - Read active exams
  - Create their own exam attempts
  - Read their own results
- Admin writes akan di-handle via admin panel (separate project)
