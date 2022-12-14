import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const user = await db.user.findUnique({
    where: { userId: id?.toString() },
    select: { userId: true, id: true, name: true, bio: true, location: true, website: true, createdAt: true },
  });

  const tweetList = await db.tweets.findMany({
    where: { user: { userId: id?.toString() } },
    orderBy: [{ id: "desc" }],
    include: {
      user: { select: { userId: true } },
      _count: { select: { answers: true, likes: true } },
    },
  });

  res.json({ ok: true, user, tweetList });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
