import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (token?.userRole !== 'real') {
    res.status(200).json({ message: 'You are signed in as guest!' });
  } else {
    res.status(200).json({ message: 'You are signed in as real user!' });
  }
}
