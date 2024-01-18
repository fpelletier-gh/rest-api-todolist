import * as dotenv from "dotenv";
dotenv.config();
import config from "config";
import { connectToDb, disconnectFromDb } from "./utils/db";
import logger from "./utils/logger";
import routes from "./routes";
import createServer from "./utils/server";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger-output.json");

const port = config.get<number>("port");
const hostname = config.get<string>("hostname");

const app = createServer();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

async function gracefulShutdown({
  signal,
}: {
  signal: (typeof signals)[number];
}) {
  logger.info(`Got signal ${signal}. Good bye`);
  await disconnectFromDb();

  process.exit(0);
}

app.listen(port, hostname, async () => {
  logger.info(`App is running at http://${hostname}:${port}`);

  await connectToDb();

  routes(app);

  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () =>
      gracefulShutdown({
        signal: signals[i],
      })
    );
  }
});
