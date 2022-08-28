import { withApiSession } from "../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) return res.status(400).json({ ok: false });
  const user = await db.user.findUnique({ where: { email: req.session.user?.email } });

  return res.json({
    ok: true,
    user,
  });
}
export default withApiSession(handler);
