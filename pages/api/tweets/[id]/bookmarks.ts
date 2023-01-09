import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExist = await db.bookmarks.findFirst({
    where: { userId: user?.id, tweetsId: Number(id) },
    select: { id: true },
  });
  if (alreadyExist) {
    await db.bookmarks.delete({
      where: {
        id: alreadyExist.id,
      },
    });
  } else {
    await db.bookmarks.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweets: { connect: { id: Number(id) } },
      },
    });
  }

  res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
