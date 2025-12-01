const admin = require('firebase-admin');
const serviceAccount = require('./pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function inspect() {
    const collections = await db.listCollections();
    console.log('Collections found:', collections.map(c => c.id));

    for (const col of collections) {
        console.log(`\n=== Collection: ${col.id} ===`);
        const snapshot = await col.limit(1).get();
        if (snapshot.empty) {
            console.log('Empty collection');
        } else {
            snapshot.forEach(doc => {
                console.log('Sample Document ID:', doc.id);
                console.log(JSON.stringify(doc.data(), null, 2));
            });
        }
    }
}

inspect().catch(console.error);
