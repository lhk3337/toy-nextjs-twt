import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import bcrypt from "bcryptjs";
import { withApiSession } from "../../lib/withSession";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;

  const user = await db.user.findUnique({ where: { userId } });
  if (!user) {
    res.json({
      ok: false,
    });
    return res.status(404).end();
  }

  const encapPassWord: any = user?.password;
  const same = bcrypt.compareSync(password, encapPassWord);
  if (!same) {
    res.json({
      ok: false,
    });
    return res.status(404).end();
  }
  req.session.user = {
    userId: user.userId,
  }; // 세션 선언
  await req.session.save(); // 세션 저장
  res.json({
    ok: true,
  });
  return res.status(200).end();
}
export default withApiSession(handler);
