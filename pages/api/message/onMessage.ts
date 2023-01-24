import db from "@libs/server/db";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
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
        msgs: { orderBy: { createdAt: "desc" }, take: 1, select: { message: true } },
      },
    });
    res.json({ ok: true, chatList });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
