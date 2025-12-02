const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const auth = admin.auth();

async function createDevUsers() {
    const developers = [
        {
            name: 'AKBAR NURRAJAB',
            npm: '50422143',
            position: 'Software Designer (UI/UX)'
        },
        {
            name: 'ALIEF KRISHNA NAVARRO',
            npm: '50422169',
            position: 'Tester(QA)'
        },
        {
            name: 'MARIA GLORIA ROHADIANI',
            npm: '50422858',
            position: 'Technical Writer'
        },
        {
            name: 'MUCHAMMAD YAFIK RAMADHANI ILHAM',
            npm: '50422925',
            position: 'Tester(QA)'
        },
        {
            name: 'NAUFAL ARDRA ANABIL',
            npm: '51422215',
            position: 'Sofware Analyst'
        },
        {
            name: 'MOHAMAD RIZKY RIYADI',
            npm: '50421837',
            position: 'Programmer'
        }
    ];

    const password = '21132113';

    console.log('Starting developer account creation...');

    for (const dev of developers) {
        console.log(`\nProcessing ${dev.name} (${dev.npm})...`);

        // 1. Check if user exists in Firestore
        const snapshot = await db.collection('users').where('npm', '==', dev.npm).get();
        let oldData = {};

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            oldData = doc.data();
            console.log('   Found existing Firestore document. Deleting...');
            await doc.ref.delete();
        }

        // 2. Check if user exists in Auth and delete
        try {
            // We can't easily find by NPM in Auth, so we construct the email and check
            const email = `${dev.npm}@developer.pppl.id`;
            try {
                const userRecord = await auth.getUserByEmail(email);
                await auth.deleteUser(userRecord.uid);
                console.log(`   Deleted existing Auth user (UID: ${userRecord.uid}).`);
            } catch (e) {
                if (e.code !== 'auth/user-not-found') {
                    console.log(`   ⚠️ Error checking Auth user: ${e.message}`);
                }
            }
        } catch (e) {
            // Ignore
        }


        // 3. Prepare new data
        const email = `${dev.npm}@developer.pppl.id`;
        const newData = {
            name: dev.name,
            npm: dev.npm, // Store NPM
            email: email,
            role: 'superadmin', // Give superadmin access
            position: dev.position,
            isActive: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        // 4. Create new Auth User
        try {
            console.log(`   Creating new Auth user with email: ${email}`);
            const userRecord = await auth.createUser({
                email: email,
                password: password,
                displayName: dev.name,
                emailVerified: true
            });

            console.log(`   ✅ Created Auth user. New UID: ${userRecord.uid}`);

            // 5. Create new Firestore Document
            newData.uid = userRecord.uid;
            await db.collection('users').doc(userRecord.uid).set(newData);
            console.log('   ✅ Created Firestore document.');

        } catch (error) {
            console.error(`   ❌ Error creating user ${dev.name}:`, error.message);
        }
    }
}

createDevUsers().catch(console.error);
