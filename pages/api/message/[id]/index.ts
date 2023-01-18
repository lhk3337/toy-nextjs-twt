import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;

  const isChat = Boolean(
    await db.chat.findUnique({
      where: { id: Number(id) },
    })
  );
  if (isChat) {
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

    res.json({ ok: true, chatUser });
  } else {
    res.json({ ok: false });
  }
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
