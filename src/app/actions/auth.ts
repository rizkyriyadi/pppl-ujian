'use server';

import { adminDb } from '@/lib/firebase-admin';

export async function getEmailByNisn(nisn: string) {
    try {
        const snapshot = await adminDb.collection('users').where('nisn', '==', nisn).limit(1).get();
        if (snapshot.empty) {
            return null;
        }
        const data = snapshot.docs[0].data();
        // Ensure we return the email, or construct it if missing (though we prefer the one in DB)
        // If email is missing in Firestore, we might have a problem, but let's assume it's there or we can't login.
        return data.email || null;
    } catch (error) {
        console.error('Error fetching email by NISN:', error);
        return null;
    }
}
