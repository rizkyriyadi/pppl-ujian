/**
 * Database Seeding Script
 *
 * This script populates the Firestore database with sample data for testing.
 *
 * USAGE:
 * 1. Make sure .env.local has correct Firebase config
 * 2. Run: npm run seed
 *
 * WARNING: This will add data to your Firestore database!
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ============================================
// SAMPLE DATA
// ============================================

// 1. Sample Students
const sampleStudents = [
  { nisn: '1234567890', name: 'Ahmad Rizki', class: '4A' },
  { nisn: '1234567891', name: 'Siti Aisyah', class: '4A' },
  { nisn: '1234567892', name: 'Budi Santoso', class: '4B' },
  { nisn: '1234567893', name: 'Dewi Lestari', class: '5A' },
  { nisn: '1234567894', name: 'Eko Prasetyo', class: '5B' },
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
  geminiApiKey: '',  // Will be filled by admin
  maintenanceMode: false
};

// ============================================
// SEEDING FUNCTIONS
// ============================================

async function seedStudents() {
  console.log('\n📚 Seeding students...');

  for (const student of sampleStudents) {
    try {
      // Generate password: nama + 4 digit terakhir nisn
      const lastFourNisn = student.nisn.slice(-4);
      const password = `${student.name}${lastFourNisn}`;

      // Create auth account
      // Format: {4 digit terakhir nisn}@students.pppl.id
      const email = `${lastFourNisn}@students.pppl.id`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // Create user document
      await setDoc(doc(db, 'users', uid), {
        uid,
        role: 'student',
        name: student.name,
        email,
        nisn: student.nisn,
        class: student.class,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log(`✅ Created student: ${student.name} (${student.nisn})`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  Student already exists: ${student.name}`);
      } else {
        console.error(`❌ Error creating student ${student.name}:`, error.message);
      }
    }
  }
}

async function seedAdmin() {
  console.log('\n👨‍💼 Seeding admin...');

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      sampleAdmin.email,
      sampleAdmin.password
    );

    const uid = userCredential.user.uid;

    await setDoc(doc(db, 'users', uid), {
      uid,
      role: 'admin',
      name: sampleAdmin.name,
      email: sampleAdmin.email,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log(`✅ Created admin: ${sampleAdmin.name}`);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`⚠️  Admin already exists`);
    } else {
      console.error(`❌ Error creating admin:`, error.message);
    }
  }
}

async function seedExams() {
  console.log('\n📝 Seeding exams and questions...');

  // Get admin ID (first admin user)
  const adminEmail = sampleAdmin.email;

  for (const examData of sampleExams) {
    try {
      // Create exam
      const examRef = await addDoc(collection(db, 'exams'), {
        ...examData.exam,
        createdBy: adminEmail,  // Using email as placeholder
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log(`✅ Created exam: ${examData.exam.title}`);

      // Create questions for this exam
      for (let i = 0; i < examData.questions.length; i++) {
        const question = examData.questions[i];

        await addDoc(collection(db, 'questions'), {
          examId: examRef.id,
          questionText: question.questionText,
          questionNumber: i + 1,
          options: question.options,
          correctAnswer: question.correctAnswer,
          subject: examData.exam.subject,
          difficulty: question.difficulty,
          explanation: question.explanation,
          imageUrl: null,
          createdAt: serverTimestamp()
        });
      }

      console.log(`   ✅ Added ${examData.questions.length} questions`);
    } catch (error: any) {
      console.error(`❌ Error creating exam:`, error.message);
    }
  }
}

async function seedSettings() {
  console.log('\n⚙️  Seeding system settings...');

  try {
    await setDoc(doc(db, 'settings', 'config'), {
      ...systemSettings,
      updatedAt: serverTimestamp()
    });

    console.log('✅ System settings created');
  } catch (error: any) {
    console.error('❌ Error creating settings:', error.message);
  }
}

// ============================================
// MAIN SEEDING FUNCTION
// ============================================

async function seedDatabase() {
  console.log('\n🌱 Starting database seeding...');
  console.log('================================\n');

  try {
    await seedAdmin();
    await seedStudents();
    await seedExams();
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
    const sampleLastFour = sampleStudents[0].nisn.slice(-4);
    const samplePassword = `${sampleStudents[0].name}${sampleLastFour}`;
    console.log(`   NISN: ${sampleStudents[0].nisn}`);
    console.log(`   Password: ${samplePassword}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();
