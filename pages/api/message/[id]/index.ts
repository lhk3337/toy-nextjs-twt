import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;
  const chatUser = await db.chat.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      sender: { select: { userId: true, avatar: true } },
      receiver: { select: { userId: true, avatar: true } },
      msgs: {
        select: {
          message: true,
          createdAt: true,
          id: true,
          updatedAt: true,
          user: { select: { avatar: true, id: true } },
        },
      },
    },
  });
  if (!chatUser) {
    res.json({ ok: false, message: "Not Founded" });
  }
  res.json({ ok: true, chatUser });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
