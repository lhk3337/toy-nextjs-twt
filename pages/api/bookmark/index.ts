import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  const tweetLikeList = await db.bookmark.findMany({
    where: { userId: user?.id },
    orderBy: [{ id: "desc" }],
    include: {
      tweets: { include: { _count: true, user: { select: { userId: true } } } },
    },
  });
  const tweetList = tweetLikeList.map((value) => value.tweets);
  res.json({ ok: true, tweetList });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
