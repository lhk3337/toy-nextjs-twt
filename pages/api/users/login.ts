import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import bcrypt from "bcryptjs";
import { withApiSession } from "@libs/server/withSession";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;

  const user = await db.user.findUnique({ where: { userId } });

  if (!user) {
    return res.json({
      ok: false,
      IdErrorMsg: "해당 아이디가 없습니다. 아이디를 생성해주세요",
    });
  }
  const encapPassWord = user?.password || "";
  const passwordComp = bcrypt.compareSync(password, encapPassWord);
  if (!passwordComp) {
    return res.json({
      ok: false,
      passwordErrorMsg: "비밀번호가 틀렸습니다. 다시 입력해주세요",
    });
  }
  req.session.user = {
    userId: user.userId,
  }; // 세션 선언
  await req.session.save(); // 세션 저장

  return res.status(200).json({ ok: true });
}
export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
