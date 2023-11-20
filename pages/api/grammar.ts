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
      "model": "gpt-3.5-turbo-1106",
      "messages": [
        {
          "role": "system",
          "content": "You are a good grammar corrector, and your job is only and only correct my English words, so please check and edit the English words that all I've sent to you and give me short explanation only if i've mistakes"
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