import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (req.method === "GET") {
    const tweet = await db.tweets.findUnique({
      where: { id: Number(id) },
      include: {
        user: { select: { userId: true } },
        answers: {
          orderBy: [{ id: "desc" }],
          select: {
            answer: true,
            id: true,
            createdAt: true,
            user: { select: { id: true, userId: true, avatar: true } },
          },
        },
      },
    });
    res.json({ ok: true, tweet });
  }
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
