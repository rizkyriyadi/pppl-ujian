/**
 * Admin Seeding Script using Firebase Admin SDK
 *
 * This script bypasses Firestore security rules and can create data directly.
 * Requires service account credentials.
 *
 * USAGE: npm run seed:admin
 */

import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccount = require(path.resolve(__dirname, '../pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://pppl-ede4b.firebaseio.com`
});

const db = admin.firestore();
const auth = admin.auth();

// ============================================
// SAMPLE DATA
// ============================================

// 1. Sample Students
const sampleStudents = [
  { nisn: '1234567890', name: 'Ahmad Rizki', class: '4A', password: 'password123' },
  { nisn: '1234567891', name: 'Siti Aisyah', class: '4A', password: 'password123' },
  { nisn: '1234567892', name: 'Budi Santoso', class: '4B', password: 'password123' },
  { nisn: '1234567893', name: 'Dewi Lestari', class: '5A', password: 'password123' },
  { nisn: '1234567894', name: 'Eko Prasetyo', class: '5B', password: 'password123' },
];

// 2. Sample Admin
const sampleAdmin = {
  email: 'admin@sdntugu1.sch.id',
  name: 'Admin Guru',
  password: 'admin123'
};

// 3. Sample Exams with Questions
const sampleExams = [
  {
    exam: {
      title: 'Ujian Matematika - Perkalian',
      description: 'Ujian tentang perkalian untuk kelas 4',
      subject: 'Matematika',
      grade: 4,
      duration: 30,
      totalQuestions: 10,
      passingScore: 70,
      isActive: true
    },
    questions: [
      {
        questionText: 'Berapa hasil dari 7 × 8?',
        options: ['54', '56', '58', '60'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: '7 × 8 = 56'
      },
      {
        questionText: 'Berapa hasil dari 12 × 5?',
        options: ['50', '55', '60', '65'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: '12 × 5 = 60'
      },
      {
        questionText: 'Berapa hasil dari 9 × 9?',
        options: ['72', '81', '90', '99'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: '9 × 9 = 81'
      },
      {
        questionText: 'Berapa hasil dari 15 × 4?',
        options: ['50', '55', '60', '65'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: '15 × 4 = 60'
      },
      {
        questionText: 'Berapa hasil dari 11 × 6?',
        options: ['60', '66', '72', '78'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: '11 × 6 = 66'
      },
      {
        questionText: 'Berapa hasil dari 8 × 7?',
        options: ['54', '56', '63', '64'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: '8 × 7 = 56'
      },
      {
        questionText: 'Berapa hasil dari 13 × 3?',
        options: ['36', '39', '42', '45'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: '13 × 3 = 39'
      },
      {
        questionText: 'Berapa hasil dari 6 × 12?',
        options: ['62', '66', '72', '76'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: '6 × 12 = 72'
      },
      {
        questionText: 'Berapa hasil dari 14 × 5?',
        options: ['60', '65', '70', '75'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: '14 × 5 = 70'
      },
      {
        questionText: 'Berapa hasil dari 9 × 11?',
        options: ['88', '99', '100', '110'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: '9 × 11 = 99'
      }
    ]
  },
  {
    exam: {
      title: 'Ujian Bahasa Indonesia - Sinonim',
      description: 'Ujian tentang persamaan kata (sinonim)',
      subject: 'Bahasa Indonesia',
      grade: 4,
      duration: 20,
      totalQuestions: 10,
      passingScore: 65,
      isActive: true
    },
    questions: [
      {
        questionText: 'Sinonim dari kata "indah" adalah...',
        options: ['cantik', 'jelek', 'buruk', 'kotor'],
        correctAnswer: 0,
        difficulty: 'easy',
        explanation: 'Indah = cantik (persamaan kata)'
      },
      {
        questionText: 'Sinonim dari kata "pintar" adalah...',
        options: ['bodoh', 'cerdas', 'malas', 'lambat'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Pintar = cerdas'
      },
      {
        questionText: 'Sinonim dari kata "cepat" adalah...',
        options: ['lambat', 'pelan', 'laju', 'santai'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Cepat = laju'
      },
      {
        questionText: 'Sinonim dari kata "senang" adalah...',
        options: ['sedih', 'marah', 'gembira', 'bosan'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Senang = gembira'
      },
      {
        questionText: 'Sinonim dari kata "besar" adalah...',
        options: ['kecil', 'mini', 'raksasa', 'pendek'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Besar = raksasa'
      },
      {
        questionText: 'Sinonim dari kata "rajin" adalah...',
        options: ['malas', 'tekun', 'lelah', 'capek'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Rajin = tekun'
      },
      {
        questionText: 'Sinonim dari kata "takut" adalah...',
        options: ['berani', 'gentar', 'gagah', 'kuat'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Takut = gentar'
      },
      {
        questionText: 'Sinonim dari kata "suka" adalah...',
        options: ['benci', 'gemar', 'jijik', 'muak'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Suka = gemar'
      },
      {
        questionText: 'Sinonim dari kata "pandai" adalah...',
        options: ['cerdik', 'bodoh', 'dungu', 'tolol'],
        correctAnswer: 0,
        difficulty: 'medium',
        explanation: 'Pandai = cerdik'
      },
      {
        questionText: 'Sinonim dari kata "riang" adalah...',
        options: ['murung', 'sedih', 'ceria', 'lesu'],
        correctAnswer: 2,
        difficulty: 'hard',
        explanation: 'Riang = ceria'
      }
    ]
  },
  {
    exam: {
      title: 'Ujian IPA - Sistem Pencernaan',
      description: 'Ujian tentang sistem pencernaan manusia',
      subject: 'IPA',
      grade: 5,
      duration: 40,
      totalQuestions: 10,
      passingScore: 70,
      isActive: true
    },
    questions: [
      {
        questionText: 'Organ pencernaan yang berfungsi mengunyah makanan adalah...',
        options: ['lambung', 'mulut', 'usus', 'hati'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Mulut adalah tempat mengunyah makanan'
      },
      {
        questionText: 'Pencernaan makanan secara kimiawi terjadi di...',
        options: ['mulut', 'tenggorokan', 'lambung', 'hidung'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Lambung menghasilkan asam untuk mencerna makanan'
      },
      {
        questionText: 'Organ yang menyerap sari-sari makanan adalah...',
        options: ['lambung', 'usus halus', 'usus besar', 'kerongkongan'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Usus halus menyerap nutrisi'
      },
      {
        questionText: 'Makanan yang mengandung banyak karbohidrat adalah...',
        options: ['daging', 'nasi', 'telur', 'ikan'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Nasi mengandung karbohidrat'
      },
      {
        questionText: 'Enzim yang ada di mulut bernama...',
        options: ['pepsin', 'amilase', 'lipase', 'tripsin'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'Amilase memecah karbohidrat di mulut'
      },
      {
        questionText: 'Waktu yang tepat untuk sarapan adalah...',
        options: ['malam hari', 'siang hari', 'pagi hari', 'sore hari'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'Sarapan dilakukan pagi hari'
      },
      {
        questionText: 'Gigi yang berfungsi memotong makanan adalah...',
        options: ['gigi taring', 'gigi seri', 'gigi geraham', 'gigi susu'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Gigi seri untuk memotong'
      },
      {
        questionText: 'Organ yang menghasilkan empedu adalah...',
        options: ['pankreas', 'hati', 'ginjal', 'jantung'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'Hati menghasilkan empedu untuk mencerna lemak'
      },
      {
        questionText: 'Usus besar berfungsi untuk...',
        options: ['menyerap air', 'mengunyah', 'memotong', 'bernapas'],
        correctAnswer: 0,
        difficulty: 'medium',
        explanation: 'Usus besar menyerap air dari sisa makanan'
      },
      {
        questionText: 'Makanan sehat yang baik untuk pencernaan adalah...',
        options: ['gorengan', 'sayuran', 'permen', 'coklat'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Sayuran mengandung serat yang baik untuk pencernaan'
      }
    ]
  }
];

// 4. System settings
const systemSettings = {
  schoolName: 'SDN Pasir Gunung Selatan 1',
  schoolAddress: 'Jl. Pasir Gunung Selatan No. 1',
  academicYear: '2024/2025',
  geminiApiKey: '',
  maintenanceMode: false
};

// ============================================
// SEEDING FUNCTIONS
// ============================================

async function seedAdmin() {
  console.log('\n👨‍💼 Seeding admin...');

  try {
    // Create auth account
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email: sampleAdmin.email,
        password: sampleAdmin.password,
        displayName: sampleAdmin.name
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`⚠️  Admin email already exists, fetching user...`);
        userRecord = await auth.getUserByEmail(sampleAdmin.email);
      } else {
        throw error;
      }
    }

    const uid = userRecord.uid;

    // Create/update user document
    await db.collection('users').doc(uid).set({
      uid,
      role: 'superadmin',
      name: sampleAdmin.name,
      email: sampleAdmin.email,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log(`✅ Created admin: ${sampleAdmin.name} (UID: ${uid})`);
    return uid;
  } catch (error: any) {
    console.error(`❌ Error creating admin:`, error.message);
    throw error;
  }
}

async function seedStudents() {
  console.log('\n📚 Seeding students...');

  for (const student of sampleStudents) {
    try {
      // Create auth account
      const email = `${student.nisn}@student.sdntugu1.sch.id`;
      let userRecord;

      try {
        userRecord = await auth.createUser({
          email,
          password: student.password,
          displayName: student.name
        });
      } catch (error: any) {
        if (error.code === 'auth/email-already-exists') {
          console.log(`⚠️  Student already exists: ${student.name}`);
          userRecord = await auth.getUserByEmail(email);
        } else {
          throw error;
        }
      }

      const uid = userRecord.uid;

      // Create/update user document
      await db.collection('users').doc(uid).set({
        uid,
        role: 'student',
        name: student.name,
        email,
        nisn: student.nisn,
        class: student.class,
        isActive: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`✅ Created student: ${student.name} (${student.nisn})`);
    } catch (error: any) {
      console.error(`❌ Error creating student ${student.name}:`, error.message);
    }
  }
}

async function seedExams(adminUid: string) {
  console.log('\n📝 Seeding exams and questions...');

  for (const examData of sampleExams) {
    try {
      // Create exam
      const examRef = await db.collection('exams').add({
        ...examData.exam,
        createdBy: adminUid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`✅ Created exam: ${examData.exam.title} (ID: ${examRef.id})`);

      // Create questions for this exam
      const batch = db.batch();
      for (let i = 0; i < examData.questions.length; i++) {
        const question = examData.questions[i];
        const questionRef = db.collection('questions').doc();

        batch.set(questionRef, {
          examId: examRef.id,
          questionText: question.questionText,
          questionNumber: i + 1,
          options: question.options,
          correctAnswer: question.correctAnswer,
          subject: examData.exam.subject,
          difficulty: question.difficulty,
          explanation: question.explanation,
          imageUrl: null,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      await batch.commit();
      console.log(`   ✅ Added ${examData.questions.length} questions`);
    } catch (error: any) {
      console.error(`❌ Error creating exam:`, error.message);
    }
  }
}

async function seedSettings() {
  console.log('\n⚙️  Seeding system settings...');

  try {
    await db.collection('settings').doc('config').set({
      ...systemSettings,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log('✅ System settings created');
  } catch (error: any) {
    console.error('❌ Error creating settings:', error.message);
  }
}

// ============================================
// MAIN SEEDING FUNCTION
// ============================================

async function seedDatabase() {
  console.log('\n🌱 Starting database seeding with Admin SDK...');
  console.log('================================\n');

  try {
    const adminUid = await seedAdmin();
    await seedStudents();
    await seedExams(adminUid);
    await seedSettings();

    console.log('\n================================');
    console.log('✅ Database seeding completed!\n');
    console.log('📋 Created:');
    console.log(`   - ${sampleStudents.length} students`);
    console.log(`   - 1 admin`);
    console.log(`   - ${sampleExams.length} exams`);
    console.log(`   - ${sampleExams.reduce((sum, e) => sum + e.questions.length, 0)} questions`);
    console.log(`   - 1 system config\n`);

    console.log('🔑 Login Credentials:');
    console.log('\nAdmin:');
    console.log(`   Email: ${sampleAdmin.email}`);
    console.log(`   Password: ${sampleAdmin.password}`);
    console.log('\nSample Student:');
    console.log(`   NISN: ${sampleStudents[0].nisn}`);
    console.log(`   Password: ${sampleStudents[0].password}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();
