import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, page },
  } = req;

  const isTweetList = await db.tweets.aggregate({
    where: { user: { userId: id?.toString() } },
    _count: true,
  });
  if (isTweetList._count) {
    const tweetList = await db.tweets.findMany({
      take: 10,
      skip: (Number(page) - 1) * 10,
      where: { user: { userId: id?.toString() } },
      orderBy: [{ id: "desc" }],
      include: {
        user: { select: { userId: true, avatar: true } },
        _count: { select: { answers: true, likes: true } },
      },
    });

    res.json({ ok: true, tweetList });
  } else {
    res.json({ ok: false, tweetList: [] });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
