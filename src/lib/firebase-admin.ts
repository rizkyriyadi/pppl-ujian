import admin from 'firebase-admin';

if (!admin.apps.length) {
    let credential;

    // 1. Try Environment Variable (Best for Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            credential = admin.credential.cert(serviceAccount);
        } catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:', error);
        }
    }

    // 2. Try Local File (Fallback for local development)
    if (!credential) {
        try {
            // Use dynamic require so it doesn't break build if file is missing
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const serviceAccount = require('../../pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json');
            credential = admin.credential.cert(serviceAccount);
        } catch {
            // File not found or other error, ignore silently as we might be in prod without the file
        }
    }

    if (credential) {
        admin.initializeApp({
            credential,
        });
    } else {
        console.error('Firebase Admin initialization failed: No credentials provided (Env var or local file).');
    }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
