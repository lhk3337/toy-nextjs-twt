import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import bcrypt from "bcryptjs";
import { withApiSession } from "../../lib/withSession";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;

  const user = await db.user.findUnique({ where: { userId } });

  if (!user) {
    return res.json({
      ok: false,
      message: "해당 아이디가 없습니다. 아이디를 생성해주세요",
    });
  }

  const encapPassWord: any = user?.password;
  const same = bcrypt.compareSync(password, encapPassWord);
  if (!same) {
    res.json({
      ok: false,
      message: "비밀번호가 틀렸습니다. 다시 입력해주세요",
    });
  }
  req.session.user = {
    userId: user.userId,
  }; // 세션 선언
  await req.session.save(); // 세션 저장

  return res.status(200).json({ ok: true });
}
export default withApiSession(handler);
