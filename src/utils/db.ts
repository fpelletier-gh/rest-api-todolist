import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export async function connectToDb() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export function disconnectFromDb() {
  return mongoose.connection.close();
}
