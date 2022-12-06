import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;
  if (!user) return res.status(400).json({ ok: false });
  const users = await db.user.findUnique({
    where: { userId: user?.userId },
    select: { userId: true, id: true },
  });

  return res.json({
    ok: true,
    user: users,
  });
}
export default withApiSession(withHandler("GET", handler));
