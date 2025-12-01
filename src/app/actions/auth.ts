'use server';

import { getAdminDb } from '@/lib/firebase-admin';

export async function getEmailByNisn(nisn: string) {
    try {
        const db = getAdminDb();
        const snapshot = await db.collection('users').where('nisn', '==', nisn).limit(1).get();
        if (snapshot.empty) {
            return null;
        }
        const data = snapshot.docs[0].data();
        return data.email || null;
    } catch (error) {
        console.error('Error fetching email by NISN:', error);
        return null;
    }
}
