import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
    body: { rtweet },
  } = req;

  const newAnswer = await db.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      tweets: {
        connect: {
          id: Number(id),
        },
      },
      answer: rtweet,
    },
  });
  res.json({ ok: true, answer: newAnswer });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
