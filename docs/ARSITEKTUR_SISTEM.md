# Arsitektur Sistem Ujian Online - SDN TUGU 1

## Ringkasan Eksekutif

Sistem Ujian Online SDN TUGU 1 adalah platform berbasis web yang dirancang untuk memfasilitasi pelaksanaan ujian digital bagi siswa sekolah dasar. Sistem ini dibangun menggunakan teknologi modern dengan arsitektur yang scalable dan maintainable.

## 1. Gambaran Umum Sistem

### 1.1 Tujuan Sistem
- Menyediakan platform ujian online yang mudah digunakan untuk siswa SD
- Mengotomatisasi proses penilaian dan pelaporan hasil ujian
- Mengurangi penggunaan kertas dan meningkatkan efisiensi administrasi
- Menyediakan interface yang intuitif untuk siswa dan guru

### 1.2 Stakeholder Utama
- **Siswa**: Pengguna utama yang mengerjakan ujian
- **Guru/Admin**: Pengelola sistem yang membuat dan mengelola ujian
- **Kepala Sekolah**: Supervisor yang memantau hasil ujian
- **IT Support**: Tim teknis yang mengelola infrastruktur

### 1.3 Fitur Utama
- Autentikasi siswa menggunakan NISN
- Dashboard ujian dengan daftar ujian aktif
- Interface pengerjaan ujian dengan timer otomatis
- Auto-submit ketika waktu habis
- Sistem penilaian otomatis
- Riwayat hasil ujian
- Responsive design untuk berbagai perangkat

## 2. Arsitektur Teknologi

### 2.1 Stack Teknologi

#### Frontend
- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript dengan strict mode
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Authentication**: Firebase Authentication

#### Backend
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Hosting**: Vercel (deployment)
- **Runtime**: Node.js dengan ESM

#### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint dengan konfigurasi Next.js
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js built-in bundler dengan Turbopack

### 2.2 Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router (React 19 + TypeScript)                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   Login     │ │  Dashboard  │ │    Exam     │          │
│  │   Page      │ │    Page     │ │    Page     │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│  ┌─────────────┐ ┌─────────────┐                          │
│  │   Results   │ │  Components │                          │
│  │   Page      │ │   Library   │                          │
│  └─────────────┘ └─────────────┘                          │
├─────────────────────────────────────────────────────────────┤
│                  AUTHENTICATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  Firebase Authentication + React Context                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  AuthContext Provider                               │   │
│  │  - User state management                            │   │
│  │  - Authentication status                            │   │
│  │  - Route protection                                 │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    SERVICE LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  Firebase SDK Integration                                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │  Auth       │ │  Firestore  │ │   Config    │          │
│  │  Service    │ │   Service   │ │   Service   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│                     DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  Firebase Firestore (NoSQL Database)                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   users     │ │    exams    │ │  questions  │          │
│  │ collection  │ │ collection  │ │ collection  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│  ┌─────────────┐ ┌─────────────┐                          │
│  │examAttempts │ │   settings  │                          │
│  │ collection  │ │ collection  │                          │
│  └─────────────┘ └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

## 3. Struktur Proyek

### 3.1 Organisasi Direktori

```
ujian/
├── src/                          # Source code utama
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/            # Halaman dashboard siswa
│   │   ├── exam/[id]/           # Halaman pengerjaan ujian
│   │   ├── login/               # Halaman autentikasi
│   │   ├── results/             # Halaman hasil ujian
│   │   ├── layout.tsx           # Root layout dengan providers
│   │   ├── page.tsx             # Landing page dengan redirect
│   │   └── globals.css          # Global styling
│   ├── components/              # Reusable UI components (future)
│   └── lib/                     # Utilities dan konfigurasi
│       ├── AuthContext.tsx      # Context untuk state autentikasi
│       ├── firebase.ts          # Konfigurasi Firebase
│       └── types.ts             # TypeScript type definitions
├── scripts/                     # Database seeding scripts
│   ├── seed.ts                  # Script untuk populate data sample
│   └── seed-admin.ts            # Script untuk membuat admin
├── docs/                        # Dokumentasi sistem
├── public/                      # Static assets
└── [config files]              # Konfigurasi build dan development
```

### 3.2 Komponen Utama

#### 3.2.1 Authentication System
- **AuthContext**: Provider untuk mengelola state autentikasi global
- **Firebase Auth**: Sistem autentikasi dengan email/password
- **Route Protection**: Middleware untuk melindungi halaman yang memerlukan login

#### 3.2.2 Page Components
- **Login Page**: Interface autentikasi dengan validasi NISN
- **Dashboard Page**: Daftar ujian aktif dengan informasi detail
- **Exam Page**: Interface pengerjaan ujian dengan timer dan navigasi soal
- **Results Page**: Tampilan hasil ujian dan riwayat

#### 3.2.3 Data Management
- **Firebase Integration**: Konfigurasi dan koneksi ke Firebase services
- **Type Definitions**: Interface TypeScript untuk type safety
- **Data Seeding**: Scripts untuk inisialisasi data sample

## 4. Desain Database

### 4.1 Struktur Collections Firestore

#### Collection: `users`
```typescript
interface User {
  id: string;                    // Auto-generated document ID
  role: 'student' | 'admin';     // Role-based access control
  name: string;                  // Nama lengkap user
  email: string;                 // Email untuk autentikasi
  nisn?: string;                 // NISN khusus untuk siswa
  class?: string;                // Kelas siswa
  createdAt: Timestamp;          // Waktu pembuatan akun
  updatedAt: Timestamp;          // Waktu update terakhir
}
```

#### Collection: `exams`
```typescript
interface Exam {
  id: string;                    // Auto-generated document ID
  title: string;                 // Judul ujian
  description: string;           // Deskripsi ujian
  subject: string;               // Mata pelajaran
  grade: number;                 // Target kelas (4, 5, 6)
  duration: number;              // Durasi dalam menit
  totalQuestions: number;        // Jumlah soal
  passingScore: number;          // Nilai minimum kelulusan
  isActive: boolean;             // Status aktif ujian
  createdBy?: string;            // ID pembuat ujian
  createdAt: Timestamp;          // Waktu pembuatan
  scheduledDate?: Timestamp;     // Jadwal ujian (opsional)
}
```

#### Collection: `questions`
```typescript
interface Question {
  id: string;                    // Auto-generated document ID
  examId: string;                // Reference ke exam
  questionText: string;          // Teks pertanyaan
  questionNumber: number;        // Nomor urut soal
  options: string[];             // Array 4 pilihan jawaban
  correctAnswer: number;         // Index jawaban benar (0-3)
  subject: string;               // Mata pelajaran
  difficulty?: string;           // Tingkat kesulitan
  explanation?: string;          // Penjelasan jawaban
  imageUrl?: string;             // URL gambar soal (opsional)
}
```

#### Collection: `examAttempts`
```typescript
interface ExamAttempt {
  id: string;                    // Auto-generated document ID
  examId: string;                // Reference ke exam
  examTitle: string;             // Judul ujian (denormalized)
  studentId: string;             // ID siswa
  studentName: string;           // Nama siswa (denormalized)
  studentClass: string;          // Kelas siswa (denormalized)
  answers: Record<string, number>; // Map question ID ke jawaban
  score: number;                 // Skor akhir (0-100)
  totalQuestions: number;        // Total soal
  correctAnswers: number;        // Jumlah jawaban benar
  incorrectAnswers: number;      // Jumlah jawaban salah
  unanswered: number;            // Jumlah soal tidak dijawab
  timeSpent: number;             // Waktu yang digunakan (detik)
  isPassed: boolean;             // Status kelulusan
  startedAt: Timestamp;          // Waktu mulai ujian
  submittedAt: Timestamp;        // Waktu submit ujian
  status: string;                // Status attempt
}
```

### 4.2 Relasi Data

```
users (1) ──────────── (N) examAttempts
  │
  └── role: 'student' | 'admin'

exams (1) ──────────── (N) questions
  │
  └── (1) ──────────── (N) examAttempts

questions (N) ──────── (1) exams
  │
  └── referenced in examAttempts.answers
```

### 4.3 Indexing Strategy

#### Recommended Indexes:
- `exams`: `isActive` (untuk query ujian aktif)
- `questions`: `examId` + `questionNumber` (untuk sorting soal)
- `examAttempts`: `studentId` + `submittedAt` (untuk riwayat siswa)
- `examAttempts`: `examId` (untuk statistik ujian)

## 5. Flow Sistem

### 5.1 Authentication Flow

```
1. Siswa mengakses aplikasi
2. Sistem redirect ke /login jika belum authenticated
3. Siswa input NISN dan password
4. Sistem convert NISN ke format email: {nisn}@student.sdntugu1.sch.id
5. Firebase Auth memvalidasi credentials
6. Jika valid, AuthContext update user state
7. Sistem redirect ke /dashboard
8. Jika invalid, tampilkan error message
```

### 5.2 Exam Taking Flow

```
1. Siswa pilih ujian dari dashboard
2. Sistem load exam data dan questions dari Firestore
3. Sistem inisialisasi timer berdasarkan exam.duration
4. Siswa mengerjakan soal satu per satu
5. Jawaban disimpan di local state (answers object)
6. Timer countdown secara real-time
7. Siswa dapat submit manual atau auto-submit saat timer habis
8. Sistem kalkulasi score berdasarkan correctAnswer
9. Hasil disimpan ke collection examAttempts
10. Redirect ke halaman hasil
```

### 5.3 Data Synchronization Flow

```
Real-time Updates:
- Exam status changes (isActive)
- New exams availability
- Timer synchronization

Offline Handling:
- Answers cached di local state
- Auto-retry submission saat koneksi kembali
- Graceful degradation untuk network issues
```

## 6. Keamanan Sistem

### 6.1 Authentication & Authorization

#### Authentication Strategy:
- Firebase Authentication dengan email/password
- NISN dikonversi ke format email untuk konsistensi
- Session management otomatis oleh Firebase

#### Authorization Levels:
- **Student**: Akses read-only ke ujian aktif, write ke examAttempts
- **Admin**: Full access ke semua collections
- **Route Protection**: Client-side guards dengan server-side validation

### 6.2 Data Security

#### Firestore Security Rules:
```javascript
// Contoh rules untuk collection examAttempts
match /examAttempts/{attemptId} {
  allow read, write: if request.auth != null 
    && request.auth.uid == resource.data.studentId;
}

// Rules untuk collection exams
match /exams/{examId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null 
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

#### Input Validation:
- Client-side validation dengan TypeScript types
- Server-side validation dengan Firestore rules
- Sanitization untuk user inputs

### 6.3 Privacy & Compliance

#### Data Protection:
- Minimal data collection (hanya yang diperlukan)
- Encryption in transit dan at rest (Firebase default)
- Regular backup dan disaster recovery

#### GDPR Considerations:
- Data retention policies
- User consent management
- Right to deletion implementation

## 7. Performance & Scalability

### 7.1 Performance Optimizations

#### Frontend Optimizations:
- Next.js App Router dengan automatic code splitting
- React 19 dengan concurrent features
- Tailwind CSS untuk optimized styling
- Image optimization dengan Next.js Image component

#### Database Optimizations:
- Denormalization untuk frequently accessed data
- Composite indexes untuk complex queries
- Pagination untuk large result sets
- Connection pooling dan caching

### 7.2 Scalability Considerations

#### Horizontal Scaling:
- Firestore auto-scaling capabilities
- Vercel edge functions untuk global distribution
- CDN untuk static assets

#### Vertical Scaling:
- Firebase pricing tiers untuk increased capacity
- Database sharding strategies untuk future growth
- Load balancing untuk high traffic periods

### 7.3 Monitoring & Analytics

#### Performance Monitoring:
- Next.js built-in analytics
- Firebase Performance Monitoring
- Real User Monitoring (RUM)

#### Business Analytics:
- Exam completion rates
- Student performance metrics
- System usage patterns

## 8. Deployment & DevOps

### 8.1 Development Workflow

#### Environment Setup:
```bash
# Development
npm run dev          # Local development server
npm run lint         # Code linting
npm run build        # Production build

# Database Management
npm run seed         # Populate sample data
npm run seed:admin   # Create admin user
```

#### Environment Variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### 8.2 Deployment Strategy

#### Production Deployment:
- **Platform**: Vercel (automatic deployments)
- **Domain**: Custom domain dengan SSL
- **Environment**: Production Firebase project
- **Monitoring**: Vercel Analytics + Firebase Monitoring

#### Staging Environment:
- Separate Firebase project untuk testing
- Branch-based deployments
- Automated testing pipeline

### 8.3 Backup & Recovery

#### Data Backup:
- Firebase automatic backups
- Export/import procedures
- Point-in-time recovery

#### Disaster Recovery:
- Multi-region deployment capability
- Database replication strategies
- Recovery time objectives (RTO) planning

## 9. Maintenance & Support

### 9.1 System Maintenance

#### Regular Maintenance Tasks:
- Database cleanup dan optimization
- Security updates dan patches
- Performance monitoring dan tuning
- Backup verification

#### Update Procedures:
- Dependency updates dengan testing
- Feature rollouts dengan feature flags
- Database migration procedures

### 9.2 User Support

#### Support Channels:
- In-app help documentation
- Admin dashboard untuk troubleshooting
- Technical support contact

#### Common Issues:
- Login problems (NISN/password)
- Timer synchronization issues
- Network connectivity problems
- Browser compatibility

## 10. Future Enhancements

### 10.1 Planned Features

#### Short-term (3-6 months):
- Admin panel untuk manajemen ujian
- Bulk question import dari Excel/CSV
- Advanced reporting dan analytics
- Mobile app development

#### Medium-term (6-12 months):
- AI-powered question generation
- Adaptive testing algorithms
- Integration dengan sistem sekolah lain
- Multi-language support

#### Long-term (1+ years):
- Machine learning untuk personalized learning
- Advanced proctoring features
- Integration dengan Learning Management System
- Blockchain untuk certificate verification

### 10.2 Technical Improvements

#### Architecture Evolution:
- Microservices architecture untuk scalability
- GraphQL API untuk efficient data fetching
- Real-time collaboration features
- Advanced caching strategies

#### Technology Upgrades:
- Next.js dan React updates
- Database optimization
- Security enhancements
- Performance improvements

## 11. Kesimpulan

Sistem Ujian Online SDN TUGU 1 dirancang dengan arsitektur modern yang mengutamakan:

1. **Simplicity**: Interface yang mudah digunakan untuk siswa SD
2. **Reliability**: Sistem yang stabil dengan auto-save dan error handling
3. **Scalability**: Arsitektur yang dapat berkembang sesuai kebutuhan
4. **Security**: Perlindungan data siswa dan integritas ujian
5. **Maintainability**: Code yang clean dan well-documented

Sistem ini memberikan foundation yang solid untuk digitalisasi proses ujian di sekolah dasar, dengan kemampuan untuk berkembang dan beradaptasi dengan kebutuhan masa depan.

---

**Dokumen ini dibuat untuk keperluan analisis sistem dan dapat digunakan sebagai referensi untuk pengembangan dan maintenance sistem.**