import App from "./app.ts";
import dotenv from "dotenv";

dotenv.config();

const app = new App().server;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Online na porta ${port}`);
});
