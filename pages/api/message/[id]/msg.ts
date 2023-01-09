import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;
  const message = await db.msg.create({
    data: { message: body.message, user: { connect: { id: user?.id } }, chat: { connect: { id: Number(id) } } },
  });
  res.json({ ok: true, message });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
