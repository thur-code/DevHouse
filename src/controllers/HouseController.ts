import type { Request, Response } from "express";
import { prisma } from "../../prisma/prisma.ts";
import * as Yup from "yup";

export default class HouseController {
  static async index(req: Request, res: Response) {
    const { status } = req.query;

    let statusFormatted;

    status === "true" ? (statusFormatted = true) : (statusFormatted = false);

    const houses = await prisma.house.findMany({
      where: {
        status: statusFormatted,
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

  static async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { filename } = req.file;
    let { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação." });
    }

    const priceFormatted = Number(price);

    status === "true" ? (status = true) : (status = false);

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const house = await prisma.house.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        thumbnail: filename,
        description,
        price: priceFormatted,
        location,
        status,
      },
    });

    return res.json({
      ...house,
      thumbnail_url: `${req.protocol}://${req.get("host")}/files/${
        house.thumbnail
      }`,
    });
  }

  static async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { filename } = req.file;
    const { house_id } = req.params;
    let { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação." });
    }

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    const house = await prisma.house.findFirst({
      where: {
        id: house_id,
      },
    });

    if (user?.id !== house?.user_id) {
      return res.status(401).json({ error: "Não autorizado." });
    }

    const priceFormatted = Number(price);

    status === "true" ? (status = true) : (status = false);

    const houses = await prisma.house.update({
      where: {
        id: house_id,
      },
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        thumbnail: filename,
        description,
        price: priceFormatted,
        location,
        status,
      },
    });

    return res.send();
  }

  static async destroy(req: Request, res: Response) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    const house = await prisma.house.findFirst({
      where: {
        id: house_id,
      },
    });

    if (user?.id !== house?.user_id) {
      return res.status(401).json({ error: "Não autorizado." });
    }

    await prisma.house.delete({
      where: {
        id: house_id,
      },
    });

    return res.json({ message: "Excluída com sucesso." });
  }
}
