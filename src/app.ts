import express from "express";
import type { Express } from "express";
import { routes } from "./routes.ts";
import path from "path";
import cors from "cors";

export default class App {
  server: Express = express();
  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      "/files",
      express.static(path.resolve(process.cwd(), "uploads"))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}
