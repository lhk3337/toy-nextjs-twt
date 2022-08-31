import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/withHandler";
import bcrypt from "bcryptjs";
import db from "../../lib/db";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { userId, password },
  } = req;

  const user = await db.user.findUnique({ where: { userId } }); // 유저 확인 유무

  //유저가 없으면 db에 user정보를 생성 하고 아닐경우 에러 메시지 생성
  if (!user) {
    res.json({ create: true });
    await db.user.create({
      data: {
        userId,
        password: bcrypt.hashSync(password, 10),
      },
    });
  } else {
    return res.json({ create: false, message: "이미 가입된 아이디 입니다. 다른 아이디를 사용해 주세요" });
  }
}

export default withHandler("POST", handler); // HOF(고차 함수)

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
