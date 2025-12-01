const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const auth = admin.auth();

async function debugUsers() {
    const targets = [
        {
            nisn: '3136840384',
            expectedName: 'Moh. Alfarezio Manumpil',
            passwordToSet: 'ori4nekl'
        },
        {
            nisn: '0136583540',
            expectedName: 'M. Akbar Nurdhafa Pratama',
            passwordToSet: 'f829r3ug'
        }
    ];

    console.log('Starting debug operations...');

    for (const target of targets) {
        console.log(`\n--------------------------------------------------`);
        console.log(`Checking NISN: ${target.nisn} (Expected: ${target.expectedName})`);

        // 1. Find in Firestore by NISN
        const snapshot = await db.collection('users').where('nisn', '==', target.nisn).get();

        if (snapshot.empty) {
            console.log('❌ User not found in Firestore by NISN.');

            // Fallback: Search by name (fuzzy/partial check not easy here, so exact match on old name maybe?)
            // Let's try searching by the "old" name for the first user if NISN failed
            if (target.expectedName.includes('Alfarezio')) {
                console.log('   Attempting search by old name "Moh. Alvarezio manumpil"...');
                const oldNameSnapshot = await db.collection('users').where('name', '==', 'Moh. Alvarezio manumpil').get();
                if (!oldNameSnapshot.empty) {
                    console.log('   ✅ Found user by old name!');
                    oldNameSnapshot.forEach(doc => processUser(doc, target));
                } else {
                    console.log('   ❌ Not found by old name either.');
                }
            }
            continue;
        }

        // Process all matches (should be unique NISN ideally)
        for (const doc of snapshot.docs) {
            await processUser(doc, target);
        }
    }
}

async function processUser(doc, target) {
    const data = doc.data();
    console.log('✅ Found in Firestore:');
    console.log(`   ID: ${doc.id}`);
    console.log(`   Name: ${data.name}`);
    console.log(`   NISN: ${data.nisn}`);
    console.log(`   UID: ${data.uid}`);

    // Update Name if it doesn't match (case sensitive check, or loose?)
    // User specifically corrected the name, so let's update it if it's different.
    if (data.name !== target.expectedName) {
        console.log(`   ⚠️ Name in DB "${data.name}" differs from expected "${target.expectedName}".`);
        console.log(`   Updating name in Firestore...`);
        await doc.ref.update({ name: target.expectedName });
        console.log('   ✅ Name updated.');
    }

    if (!data.uid) {
        console.log('❌ No UID field in Firestore document. Cannot check Auth.');
        return;
    }

    // 2. Check in Auth
    try {
        const userRecord = await auth.getUser(data.uid);
        console.log('✅ Found in Firebase Auth:');
        console.log(`   UID: ${userRecord.uid}`);

        // 3. Reset Password
        console.log(`   Resetting password to: ${target.passwordToSet}`);
        await auth.updateUser(data.uid, {
            password: target.passwordToSet
        });
        console.log('   ✅ Password updated successfully.');

    } catch (error) {
        console.log('❌ Error fetching/updating user in Auth:', error.message);
        if (error.code === 'auth/user-not-found') {
            console.log('   User exists in Firestore but NOT in Auth. Creating Auth user...');
            try {
                const newUser = await auth.createUser({
                    uid: data.uid, // Try to reuse the UID from Firestore
                    email: `${target.nisn}@sekolah.id`, // Dummy email if needed, or maybe just username? 
                    // Firebase Auth usually needs email or phone. Let's assume email is used or just password.
                    // If the original system used email, we might need it. 
                    // But looking at perform_ops.js, it just updates password.
                    // If we create a user, we need an identifier.
                    password: target.passwordToSet,
                    displayName: target.expectedName
                });
                console.log('   ✅ Created new Auth user with UID:', newUser.uid);
            } catch (createError) {
                console.log('   ❌ Failed to create Auth user:', createError.message);
            }
        }
    }
}

debugUsers().catch(console.error);
