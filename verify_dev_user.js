const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyDevUser() {
    const npm = '50421837';
    console.log(`Verifying user with NPM: ${npm}...`);

    const snapshot = await db.collection('users').where('npm', '==', npm).get();

    if (snapshot.empty) {
        console.log('❌ User not found in Firestore.');
    } else {
        const doc = snapshot.docs[0];
        const data = doc.data();
        console.log('✅ User found:');
        console.log(JSON.stringify(data, null, 2));

        if (data.role === 'superadmin') {
            console.log('✅ Role is correctly set to superadmin.');
        } else {
            console.log(`❌ Role is incorrect: ${data.role}`);
        }
    }
}

verifyDevUser().catch(console.error);
