import FirebaseAdmin from '@/utils/FirebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(await checkAccessIsValid('qgGw2HtKI3gOqEFf1jRFoBow1Og1'));

    res.status(200).json({
        status: 'Oke',

    })
}

async function checkAccessIsValid(uid: string) {
    const firestoreAdmin = FirebaseAdmin.firestore();
    const validTokenRef = await firestoreAdmin.collection('access_token').doc(uid).get()
    const validTokenDoc = validTokenRef.data();
    if (Date.now() <= validTokenDoc?.valid_to) {
        return true
    }
    return false

}