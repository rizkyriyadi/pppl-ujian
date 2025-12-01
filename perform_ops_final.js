const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function performOperations() {
    console.log('Starting final database operations...');

    // 1. Delete exam attempts for VANEZA QUEENA BHAYANGKARA (Bahasa Indonesia)
    console.log('\n--- Operation: Delete Bahasa Indonesia attempts for VANEZA QUEENA BHAYANGKARA ---');
    const attemptsVaneza = await db.collection('examAttempts')
        .where('studentName', '==', 'VANEZA QUEENA BHAYANGKARA')
        .get();

    if (attemptsVaneza.empty) {
        console.log('No exam attempts found for VANEZA QUEENA BHAYANGKARA.');
    } else {
        let count = 0;
        const batch = db.batch();
        attemptsVaneza.docs.forEach(doc => {
            const data = doc.data();
            const examTitle = data.examTitle || '';
            const examId = data.examId || '';

            // Check examTitle or examId
            if (examTitle.toLowerCase().includes('bahasa indonesia') || examId.toLowerCase().includes('bi_')) {
                batch.delete(doc.ref);
                count++;
                console.log(`Marked for deletion: ${doc.id} (${examTitle})`);
            }
        });

        if (count > 0) {
            await batch.commit();
            console.log(`Deleted ${count} Bahasa Indonesia attempts.`);
        } else {
            console.log('No Bahasa Indonesia attempts found to delete.');
        }
    }
}

performOperations().catch(console.error);
