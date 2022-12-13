import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import bcrypt from "bcryptjs";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { userId, password },
  } = req;
  if (req.method === "POST") {
    const user = await db.user.findUnique({ where: { userId } }); // 유저 확인 유무

    //유저가 없으면 db에 user정보를 생성 하고 아닐경우 에러 메시지 생성
    if (!user) {
      res.json({ ok: true });
      await db.user.create({
        data: {
          userId,
          password: bcrypt.hashSync(password, 10),
        },
      });
    } else {
      return res.json({ ok: false, message: "이미 가입된 아이디 입니다. 다른 아이디를 사용해 주세요" });
    }
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false })); // HOF(고차 함수)

/*
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import db from "../../lib/db";

export default function withHandler() {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    async function handler(req: NextApiRequest, res: NextApiResponse) {
      const { userId, password } = req.body;
      await db.user.create({
        data: {
          userId,
          password: bcrypt.hashSync(password, 10),
        },
      });

      res.status(200).end();
    }
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
*/
