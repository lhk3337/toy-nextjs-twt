import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { page },
  } = req;

  if (req.method === "GET") {
    const tweetList = await db.tweets.findMany({
      take: 10,
      skip: (Number(page) - 1) * 10,
      orderBy: [{ id: "desc" }],
      include: {
        user: { select: { userId: true, avatar: true } },
        _count: { select: { answers: true, likes: true, bookmarks: true } },
      },
    });
    res.json({ ok: true, tweetList });
  }
  if (req.method === "POST") {
    const {
      body: { tweets },
      session: { user },
    } = req;
    const tweet = await db.tweets.create({
      data: {
        user: { connect: { id: user?.id } },
        tweet: tweets,
      },
    });
    res.json({ ok: true, tweet });
  }
}
export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
