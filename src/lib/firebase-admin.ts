import admin from 'firebase-admin';

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, '\n');
}

function initFirebaseAdmin() {
    if (admin.apps.length) {
        return;
    }

    let credential;

    // 1. Try Environment Variable (Best for Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            // Fix private key formatting if needed (common issue with env vars)
            if (serviceAccount.private_key) {
                serviceAccount.private_key = formatPrivateKey(serviceAccount.private_key);
            }
            credential = admin.credential.cert(serviceAccount);
        } catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:', error);
        }
    }

    // 2. Try Local File (Fallback for local development)
    if (!credential) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const serviceAccount = require('../../pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');
            credential = admin.credential.cert(serviceAccount);
        } catch {
            // Ignore
        }
    }

    if (credential) {
        admin.initializeApp({
            credential,
        });
    } else {
        // Throwing here might be too aggressive if we want to allow the module to be imported
        // but not used. However, if getAdminAuth/Db is called, we must throw.
        console.error('Firebase Admin initialization failed: No credentials provided.');
    }
}

export function getAdminAuth() {
    initFirebaseAdmin();
    if (!admin.apps.length) {
        throw new Error('Firebase Admin not initialized. Check server logs for credential errors.');
    }
    return admin.auth();
}

export function getAdminDb() {
    initFirebaseAdmin();
    if (!admin.apps.length) {
        throw new Error('Firebase Admin not initialized. Check server logs for credential errors.');
    }
    return admin.firestore();
}
