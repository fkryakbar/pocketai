import FirebaseAdmin from '@/utils/FirebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requestBody = JSON.parse(req.body);
    const access = await checkAccessIsValid(requestBody.uid)
    if (req.method == 'POST' && access) {

        const objectData = {
            "model": "gpt-4-1106-preview",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a good assistant, your task is to help me solve various problems and provide the information I need"
                },
                {
                    "role": "user",
                    "content": `${requestBody.sentences}`
                }
            ]
        };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${process.env.OPEN_AI_TOKEN}`
            },
            body: JSON.stringify(objectData)
        })
        if (response.status == 200) {
            const data = await response.json();

            res.status(200).json(data)
        } else {
            const data = await response.json();

            res.status(response.status).json(data)
        }
    } else {
        res.status(404).json({
            message: "Invalid Request",
        } as any)
    }
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