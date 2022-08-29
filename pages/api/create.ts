import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/withHandler";
import bcrypt from "bcryptjs";
import db from "../../lib/db";
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
