// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import quizMst from '../../data/quizMST.json'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(quizMst)
}

export default handler
