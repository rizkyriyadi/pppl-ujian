const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function debug() {
    console.log('--- Inspecting VANEZA QUEENA BHAYANGKARA Attempts (Fields Only) ---');
    const attemptsVaneza = await db.collection('examAttempts')
        .where('studentName', '==', 'VANEZA QUEENA BHAYANGKARA')
        .get();

    if (attemptsVaneza.empty) {
        console.log('No attempts found.');
    } else {
        attemptsVaneza.docs.forEach(doc => {
            const data = doc.data();
            console.log(`ID: ${doc.id}`);
            console.log(`examId: ${data.examId}`);
            console.log(`subject: ${data.subject}`);
            console.log(`examTitle: ${data.examTitle}`);
            console.log('-------------------');
        });
    }
}

debug().catch(console.error);
