import type { Request, Response } from "express";
import { prisma } from "../../prisma/prisma.ts";

export default class DashboardController {
  static async show(req: Request, res: Response) {
    const { user_id } = req.headers;

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const houses = await prisma.house.findMany({
      where: {
        user_id,
      },
    });

    const formattedHouses = houses.map((house) => ({
      ...house,
      thumbnail_url: `${req.protocol}://${req.get("host")}/files/${
        house.thumbnail
      }`,
    }));

    return res.json(formattedHouses);
  }
}
