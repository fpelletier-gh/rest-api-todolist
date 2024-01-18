import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/deserialiseUser";
import cors from "cors";
import config from "config";

function createServer() {
  const app = express();
  const corsOrigin = config.get<string>("corsOrigin");

  app.use(
    cors({
      credentials: true,
      origin: corsOrigin,
    })
  );

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);

  return app;
}

export default createServer;
