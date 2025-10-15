# Sample Data for Testing

## Create Test Student Account

Di Firebase Console > Authentication:

1. Click "Add User"
2. Email: `1234567890@student.sdntugu1.sch.id`
3. Password: `password123`
4. Uid akan di-generate otomatis

## Sample Exam Data

Di Firestore Console, buat collection `exams` dengan document berikut:

### Contoh Ujian Matematika

```json
{
  "title": "Ujian Matematika - Perkalian",
  "description": "Ujian matematika tentang perkalian untuk kelas 4",
  "subject": "Matematika",
  "duration": 30,
  "totalQuestions": 5,
  "isActive": true,
  "createdAt": "2025-01-15T00:00:00Z",
  "questions": [
    {
      "id": "q1",
      "question": "Berapa hasil dari 7 x 8?",
      "options": ["54", "56", "58", "60"],
      "correctAnswer": 1,
      "subject": "Matematika"
    },
    {
      "id": "q2",
      "question": "Berapa hasil dari 12 x 5?",
      "options": ["50", "55", "60", "65"],
      "correctAnswer": 2,
      "subject": "Matematika"
    },
    {
      "id": "q3",
      "question": "Berapa hasil dari 9 x 9?",
      "options": ["72", "81", "90", "99"],
      "correctAnswer": 1,
      "subject": "Matematika"
    },
    {
      "id": "q4",
      "question": "Berapa hasil dari 15 x 4?",
      "options": ["50", "55", "60", "65"],
      "correctAnswer": 2,
      "subject": "Matematika"
    },
    {
      "id": "q5",
      "question": "Berapa hasil dari 11 x 6?",
      "options": ["60", "66", "72", "78"],
      "correctAnswer": 1,
      "subject": "Matematika"
    }
  ]
}
```

### Contoh Ujian Bahasa Indonesia

```json
{
  "title": "Ujian Bahasa Indonesia - Sinonim",
  "description": "Ujian tentang persamaan kata (sinonim)",
  "subject": "Bahasa Indonesia",
  "duration": 20,
  "totalQuestions": 5,
  "isActive": true,
  "createdAt": "2025-01-15T00:00:00Z",
  "questions": [
    {
      "id": "q1",
      "question": "Sinonim dari kata 'indah' adalah...",
      "options": ["cantik", "jelek", "buruk", "kotor"],
      "correctAnswer": 0,
      "subject": "Bahasa Indonesia"
    },
    {
      "id": "q2",
      "question": "Sinonim dari kata 'pintar' adalah...",
      "options": ["bodoh", "cerdas", "malas", "lambat"],
      "correctAnswer": 1,
      "subject": "Bahasa Indonesia"
    },
    {
      "id": "q3",
      "question": "Sinonim dari kata 'cepat' adalah...",
      "options": ["lambat", "pelan", "laju", "santai"],
      "correctAnswer": 2,
      "subject": "Bahasa Indonesia"
    },
    {
      "id": "q4",
      "question": "Sinonim dari kata 'senang' adalah...",
      "options": ["sedih", "marah", "gembira", "bosan"],
      "correctAnswer": 2,
      "subject": "Bahasa Indonesia"
    },
    {
      "id": "q5",
      "question": "Sinonim dari kata 'besar' adalah...",
      "options": ["kecil", "mini", "raksasa", "pendek"],
      "correctAnswer": 2,
      "subject": "Bahasa Indonesia"
    }
  ]
}
```

## How to Add to Firestore

1. Buka Firebase Console > Firestore Database
2. Click "Start Collection"
3. Collection ID: `exams`
4. Click "Add Document"
5. Paste JSON di atas (atau tulis manual field by field)
6. Document ID biarkan auto-generate
7. Click "Save"

## Login untuk Testing

- NISN: `1234567890`
- Password: `password123`
