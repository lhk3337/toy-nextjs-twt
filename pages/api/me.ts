import { withApiSession } from "../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

import db from "../../lib/db";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) return res.status(400).json({ ok: false });
  const user = await db.user.findUnique({
    where: { userId: req.session.user?.userId },
    select: { userId: true, id: true },
  });

  return res.json({
    ok: true,
    user,
  });
}
export default withApiSession(withHandler("GET", handler));
