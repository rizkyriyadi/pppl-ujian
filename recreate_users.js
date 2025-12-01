const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const auth = admin.auth();

async function recreateUsers() {
    const targets = [
        {
            nisn: '3136840384',
            name: 'Moh. Alfarezio Manumpil',
            password: 'manumpil2113'
        },
        {
            nisn: '0136583540',
            name: 'M. Akbar Nurdhafa Pratama',
            password: 'akbar2113'
        }
    ];

    console.log('Starting user recreation...');

    for (const target of targets) {
        console.log(`\nProcessing ${target.name} (${target.nisn})...`);

        // 1. Fetch existing data to preserve info
        const snapshot = await db.collection('users').where('nisn', '==', target.nisn).get();
        let oldData = {};

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            oldData = doc.data();
            console.log('   Found existing Firestore document.');
            console.log('   Old Data:', JSON.stringify(oldData, null, 2));

            // 2. Delete from Firestore
            await doc.ref.delete();
            console.log('   Deleted from Firestore.');

            // 3. Delete from Auth
            if (oldData.uid) {
                try {
                    await auth.deleteUser(oldData.uid);
                    console.log(`   Deleted Auth user (UID: ${oldData.uid}).`);
                } catch (e) {
                    console.log(`   ⚠️ Could not delete Auth user: ${e.message}`);
                }
            }
        } else {
            console.log('   No existing Firestore document found. Creating fresh.');
        }

        // 4. Prepare new data
        // Use a standard email format: NISN@students.pppl.id
        const email = `${target.nisn}@students.pppl.id`;

        // Merge old data with new requirements, ensuring critical fields are set
        const newData = {
            ...oldData, // Keep old fields like class, schoolId etc.
            name: target.name,
            nisn: target.nisn,
            email: email,
            role: oldData.role || 'student', // Default to student
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        // Remove uid from newData temporarily as we will set it from the new Auth user
        delete newData.uid;

        // 5. Create new Auth User
        try {
            console.log(`   Creating new Auth user with email: ${email}`);
            const userRecord = await auth.createUser({
                email: email,
                password: target.password,
                displayName: target.name,
                emailVerified: true
            });

            console.log(`   ✅ Created Auth user. New UID: ${userRecord.uid}`);

            // 6. Create new Firestore Document
            newData.uid = userRecord.uid; // Link to Auth

            // If createdAt is missing, add it
            if (!newData.createdAt) {
                newData.createdAt = admin.firestore.FieldValue.serverTimestamp();
            }

            await db.collection('users').doc(userRecord.uid).set(newData);
            console.log('   ✅ Created Firestore document.');

        } catch (error) {
            console.error(`   ❌ Error creating user ${target.name}:`, error.message);
        }
    }
}

recreateUsers().catch(console.error);
