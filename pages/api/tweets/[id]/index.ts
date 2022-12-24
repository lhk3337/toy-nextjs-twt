import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
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
        _count: { select: { answers: true, likes: true, bookmarks: true } },
      },
    });

    const isBoolean = async (dbType: any) => {
      return Boolean(
        await dbType.findFirst({
          where: { tweetsId: Number(id), userId: user?.id },
        })
      );
    };

    res.json({ ok: true, tweet, isLiking: await isBoolean(db.like), isBookMarking: await isBoolean(db.bookmark) });
  }
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
