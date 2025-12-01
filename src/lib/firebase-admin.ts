import admin from 'firebase-admin';
import serviceAccount from '../../pppl-ede4b-firebase-adminsdk-fbsvc-af6cbefe26.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
