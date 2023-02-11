import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/deserialiseUser";
import cors from "cors";

function createServer() {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);

  return app;
}

export default createServer;
