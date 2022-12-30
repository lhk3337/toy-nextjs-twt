import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
    body: { rtId },
  } = req;

  const isRtWriter = Boolean(
    await db.answer.findFirst({ where: { id: rtId, tweetsId: Number(id), userId: user?.id } })
  );
  if (isRtWriter) {
    await db.answer.delete({
      where: {
        id: rtId,
      },
    });
  }
  res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
