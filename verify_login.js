const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function getEmailByIdentifier(identifier) {
    try {
        // Try to find by NISN first
        let snapshot = await db.collection('users').where('nisn', '==', identifier).limit(1).get();

        // If not found, try to find by NPM
        if (snapshot.empty) {
            console.log(`   Not found by NISN: ${identifier}. Checking NPM...`);
            snapshot = await db.collection('users').where('npm', '==', identifier).limit(1).get();
        } else {
            console.log(`   Found by NISN: ${identifier}`);
        }

        if (snapshot.empty) {
            console.log(`   Not found by NPM either: ${identifier}`);
            return null;
        } else {
            if (snapshot.docs[0].data().npm === identifier) {
                console.log(`   Found by NPM: ${identifier}`);
            }
        }

        const data = snapshot.docs[0].data();
        return data.email || null;
    } catch (error) {
        console.error('Error fetching email by identifier:', error);
        return null;
    }
}

async function verifyLogin() {
    console.log('Verifying Login Logic...');

    // 1. Test with Student NISN
    const studentNisn = '0134894229'; // Zahra
    console.log(`\nTesting Student NISN: ${studentNisn}`);
    const studentEmail = await getEmailByIdentifier(studentNisn);
    console.log(`Result: ${studentEmail}`);

    // 2. Test with Developer NPM
    const devNpm = '50421837'; // Rizky
    console.log(`\nTesting Developer NPM: ${devNpm}`);
    const devEmail = await getEmailByIdentifier(devNpm);
    console.log(`Result: ${devEmail}`);

    // 3. Test with Invalid ID
    const invalidId = '99999999';
    console.log(`\nTesting Invalid ID: ${invalidId}`);
    const invalidEmail = await getEmailByIdentifier(invalidId);
    console.log(`Result: ${invalidEmail}`);
}

verifyLogin().catch(console.error);
