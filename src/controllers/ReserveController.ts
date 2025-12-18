import type { Request, Response } from "express";
import { prisma } from "../../prisma/prisma.ts";

export default class ReserverController {
  static async index(req: Request, res: Response) {
    const { user_id } = req.headers;

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const reserves = await prisma.reserve.findMany({
      where: {
        user_id,
      },
      include: {
        house: true,
      },
    });

    return res.json(reserves);
  }

  static async store(req: Request, res: Response) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const house = await prisma.house.findFirst({
      where: {
        id: house_id,
      },
    });

    if (!house) {
      return res.status(400).json({ error: "Essa casa não existe." });
    }

    if (house.status !== true) {
      return res.status(400).json({ error: "Solicitação indisponível" });
    }

    const user = await prisma.user.findFirst({
      where: { id: user_id },
    });

    if (user?.id === house.user_id) {
      return res.status(401).json({ error: "Reserva não permitida" });
    }

    const reservationAlreadyExists = await prisma.reserve.findFirst({
      where: {
        house_id,
      },
    });

    if (reservationAlreadyExists) {
      return res.status(400).json({ error: "Residência já reservada." });
    }

    const reserve = await prisma.reserve.create({
      data: {
        user_id,
        house_id,
        date,
      },
    });

    const reserveWithRelations = await prisma.reserve.findUnique({
      where: { id: reserve.id },
      include: {
        house: true,
        user: true,
      },
    });

    return res.json(reserveWithRelations);
  }

  static async destroy(req: Request, res: Response) {
    const { reserve_id } = req.body;

    await prisma.reserve.delete({
      where: {
        id: reserve_id,
      },
    });

    return res.send();
  }
}
