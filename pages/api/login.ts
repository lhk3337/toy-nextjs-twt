import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import bcrypt from "bcryptjs";
import { withApiSession } from "../../lib/withSession";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await db.user.findUnique({ where: { email } });

  const encapPassWord: any = user?.password;
  const same = bcrypt.compareSync(password, encapPassWord);
  if (!user) return res.status(404).json({ ok: false });

  if (!same) {
    res.json({
      ok: false,
    });
    return res.status(404).end();
  }
  req.session.user = {
    email: user.email,
  };
  await req.session.save();
  res.json({
    ok: true,
  });
  console.log(req.session.user);
  return res.status(200).end();
}
export default withApiSession(handler);
