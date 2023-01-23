import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { page },
  } = req;

  const tweetLikeList = await db.bookmarks.findMany({
    take: 10,
    skip: (Number(page) - 1) * 10,
    where: { userId: user?.id },
    orderBy: [{ id: "desc" }],
    include: {
      tweets: { include: { _count: true, user: { select: { userId: true, avatar: true } } } },
    },
  });
  const tweetList = tweetLikeList.map((value) => value.tweets);
  res.json({ ok: true, tweetList });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
