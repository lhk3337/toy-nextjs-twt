import db from "@libs/server/db";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { id }, // 상대방 아이디
    session: { user }, // 로그인 유저 아이디
    query: { page },
  } = req;

  if (req.method === "GET") {
    const chatList = await db.chat.findMany({
      take: 15,
      skip: (Number(page) - 1) * 15,
      where: { OR: [{ senderId: user?.id }, { receiverId: user?.id }] },
      orderBy: {
        id: "asc",
      },
      include: {
        sender: { select: { userId: true, avatar: true } },
        receiver: { select: { userId: true, avatar: true } },
        msgs: { orderBy: { createdAt: "desc" }, take: 1, select: { message: true } },
        // message의 마지막 항목
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
