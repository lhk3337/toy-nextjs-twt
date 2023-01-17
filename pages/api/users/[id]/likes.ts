import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, page },
  } = req;

  const tweetLikeList = await db.likes.findMany({
    take: 10,
    skip: (Number(page) - 1) * 10,
    where: { user: { userId: id?.toString() } },
    orderBy: [{ id: "desc" }],
    include: {
      tweets: {
        include: {
          user: { select: { userId: true, avatar: true } },
          _count: { select: { answers: true, likes: true } },
        },
      },
    },
  });
  const tweetList = tweetLikeList.map((value) => value.tweets);
  res.json({ ok: true, tweetList });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
