import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import bcrypt from "bcryptjs";

import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const data = await db.user.findUnique({ where: { email } });

  const encapPassWord: any = data?.password;
  const same = bcrypt.compareSync(password, encapPassWord);

  if (!same) {
    res.json({
      ok: false,
    });
    return res.status(404).end();
  }
  res.json({
    ok: true,
  });
  return res.status(200).end();
}
export default withHandler("POST", handler);
