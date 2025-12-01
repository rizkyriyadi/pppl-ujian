const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function inspect() {
    const snapshot = await db.collection('examAttempts').limit(1).get();
    if (snapshot.empty) {
        console.log('No examAttempts found');
    } else {
        snapshot.forEach(doc => {
            console.log('Sample examAttempts:', JSON.stringify(doc.data(), null, 2));
        });
    }
}

inspect().catch(console.error);
