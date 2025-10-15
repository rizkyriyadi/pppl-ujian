# Firebase Firestore Database Structure

## Collections

### 1. `students`
Menyimpan data siswa yang terdaftar.

```
{
  id: string (auto-generated)
  name: string
  nisn: string (unique)
  class: string
  createdAt: timestamp
}
```

### 2. `exams`
Menyimpan data ujian yang dibuat oleh guru.

```
{
  id: string (auto-generated)
  title: string
  description: string
  subject: string
  duration: number (dalam menit)
  totalQuestions: number
  questions: [
    {
      id: string
      question: string
      options: [string, string, string, string]
      correctAnswer: number (index 0-3)
      subject: string
    }
  ]
  createdAt: timestamp
  isActive: boolean
}
```

### 3. `examAttempts`
Menyimpan hasil ujian siswa.

```
{
  id: string (auto-generated)
  examId: string
  examTitle: string
  studentId: string (Firebase Auth UID)
  studentEmail: string
  answers: {
    [questionId]: answerIndex
  }
  score: number (0-100)
  totalQuestions: number
  correctAnswers: number
  startedAt: timestamp
  submittedAt: timestamp
}
```

## Firebase Authentication

Students login menggunakan format email:
- Email: `{nisn}@student.sdnpgs1.sch.id`
- Password: Set oleh admin/guru

## Indexes Required

Untuk optimal query performance, buat indexes berikut di Firestore:

1. **examAttempts Collection**
   - Field: `studentId` (Ascending) + `submittedAt` (Descending)

2. **exams Collection**
   - Field: `isActive` (Ascending) + `createdAt` (Descending)

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Students can only read their own data
    match /students/{studentId} {
      allow read: if request.auth != null && request.auth.uid == studentId;
      allow write: if false; // Only admin can write
    }

    // All authenticated users can read active exams
    match /exams/{examId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can write
    }

    // Students can read their own attempts and create new ones
    match /examAttempts/{attemptId} {
      allow read: if request.auth != null && resource.data.studentId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.studentId == request.auth.uid;
      allow update, delete: if false;
    }
  }
}
```
