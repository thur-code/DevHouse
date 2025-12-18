import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload.ts";

import SessionController from "./controllers/SessionController.ts";
import HouseController from "./controllers/HouseController.ts";
import DashboardController from "./controllers/DashboardController.ts";
import ReserverController from "./controllers/ReserveController.ts";

export const routes = Router();

const upload = multer(uploadConfig);

// SessionController
routes.post("/sessions", SessionController.store);
routes.delete("/sessions/:id", SessionController.destroy);

// HouseController
routes.post("/houses", upload.single("thumbnail"), HouseController.store);
routes.get("/houses", HouseController.index);
routes.put(
  "/houses/:house_id",
  upload.single("thumbnail"),
  HouseController.update
);
routes.delete("/houses", HouseController.destroy);

// Dashboard Controller
routes.get("/dashboard", DashboardController.show);

// ReserveController
routes.get("/reserves", ReserverController.index);
routes.post("/houses/:house_id/reserve", ReserverController.store);
routes.delete("/reserves/cancel", ReserverController.destroy);
