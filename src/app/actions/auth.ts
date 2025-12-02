'use server';

import { getAdminDb } from '@/lib/firebase-admin';

export async function getEmailByIdentifier(identifier: string) {
    try {
        const db = getAdminDb();

        // Try to find by NISN first
        let snapshot = await db.collection('users').where('nisn', '==', identifier).limit(1).get();

        // If not found, try to find by NPM
        if (snapshot.empty) {
            snapshot = await db.collection('users').where('npm', '==', identifier).limit(1).get();
        }

        if (snapshot.empty) {
            return null;
        }

        const data = snapshot.docs[0].data();
        return data.email || null;
    } catch (error) {
        console.error('Error fetching email by identifier:', error);
        return null;
    }
}
