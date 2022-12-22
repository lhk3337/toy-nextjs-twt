import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  const tweetList = await db.tweets.findMany({
    where: { userId: user?.id },
    orderBy: [{ id: "desc" }],
    include: {
      user: { select: { userId: true } },
      _count: { select: { answers: true, likes: true, bookmarks: true } },
    },
  });
  res.json({ ok: true, tweetList });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
