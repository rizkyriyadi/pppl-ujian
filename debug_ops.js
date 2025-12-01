const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function debug() {
    console.log('--- Inspecting VANEZA QUEENA BHAYANGKARA Attempts ---');
    const attemptsVaneza = await db.collection('examAttempts')
        .where('studentName', '==', 'VANEZA QUEENA BHAYANGKARA')
        .get();

    attemptsVaneza.docs.forEach(doc => {
        console.log(`ID: ${doc.id}`, JSON.stringify(doc.data(), null, 2));
    });

    console.log('\n--- Listing All Users ---');
    const users = await db.collection('users').get();
    users.docs.forEach(doc => {
        console.log(`- ${doc.data().name} (NISN: ${doc.data().nisn})`);
    });
}

debug().catch(console.error);
