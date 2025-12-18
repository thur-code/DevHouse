import type { Request, Response } from "express";
import { prisma } from "../../prisma/prisma.ts";
import * as Yup from "yup";

export default class SessionController {
  static async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação." });
    }

    let user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
        },
      });
    }

    return res.json(user);
  }

  static async destroy(req: Request, res: Response) {
    const { id } = req.params;

    let user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  }
}
