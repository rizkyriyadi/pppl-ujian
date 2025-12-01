const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const auth = admin.auth();

async function performOperations() {
    console.log('Starting database operations (Round 2)...');

    // 1. Delete exam attempts for VANEZA QUEENA BHAYANGKARA (Bahasa Indonesia)
    console.log('\n--- Operation 2: Delete Bahasa Indonesia attempts for VANEZA QUEENA BHAYANGKARA ---');
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
            const examId = data.examId || '';
            // Check examId for 'indonesia' since subject is undefined
            if (examId.toLowerCase().includes('indonesia')) {
                batch.delete(doc.ref);
                count++;
            }
        });

        if (count > 0) {
            await batch.commit();
            console.log(`Deleted ${count} Bahasa Indonesia attempts (matched by examId).`);
        } else {
            console.log('No Bahasa Indonesia attempts found to delete.');
        }
    }

    // 2. Reset password for Moh. Alfarezio Manumpil (Corrected Name)
    await resetPassword('Moh. Alfarezio Manumpil');
}

async function resetPassword(name) {
    console.log(`\n--- Resetting password for ${name} ---`);
    const userQuery = await db.collection('users').where('name', '==', name).get();

    if (userQuery.empty) {
        console.log(`User ${name} not found in Firestore.`);
        return;
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    const uid = userData.uid;
    const nisn = userData.nisn;

    if (!uid) {
        console.log(`User ${name} has no UID in Firestore.`);
        return;
    }

    // Generate random 8-char password
    const newPassword = Math.random().toString(36).slice(-8);

    try {
        await auth.updateUser(uid, {
            password: newPassword
        });
        console.log(`Password updated successfully.`);
        console.log(`Name: ${name}`);
        console.log(`NISN: ${nisn}`);
        console.log(`New Password: ${newPassword}`);
    } catch (error) {
        console.error(`Error updating password for ${name}:`, error.message);
    }
}

performOperations().catch(console.error);
