import db from "@libs/server/db";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { userId },
  } = req;
  if (!userId) return;
  const findUser = await db.user.findMany({
    where: {
      userId: {
        startsWith: userId.toString(),
      },
    },
    select: { userId: true, avatar: true, bio: true },
  });
  res.json({ ok: true, findUser });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
