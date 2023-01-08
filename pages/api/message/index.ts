import db from "@libs/server/db";
import bcrypt from "bcryptjs";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { id }, // 상대방 아이디
    session: { user }, // 로그인 유저 아이디
  } = req;

  if (req.method === "GET") {
    const chatList = await db.chat.findMany({
      where: { OR: [{ senderId: user?.id }, { receiverId: user?.id }] },
      orderBy: {
        id: "asc",
      },
      include: {
        sender: { select: { userId: true, avatar: true } },
        receiver: { select: { userId: true, avatar: true } },
        msgs: { select: { message: true } },
      },
    });
    res.json({ ok: true, chatList });
  }
  if (req.method === "POST") {
    const isChat = Boolean(await db.chat.findFirst({ where: { receiverId: id, senderId: Number(user?.id) } }));

    if (isChat) {
      res.json({ ok: false });
    } else {
      const createChat = await db.chat.create({ data: { receiverId: id, senderId: Number(user?.id) } });
      res.json({ ok: true, createChat });
    }
  }
}

export default withApiSession(withHandler({ methods: ["POST", "GET"], handler }));
