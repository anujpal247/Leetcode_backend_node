import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";

async function connectDB(){
  try {
    const dbUrl = serverConfig.DB_URL;
    await mongoose.connect(dbUrl);
    logger.info("Connected to DB successfully");

    mongoose.connection.on("error", (error) => {
      logger.error("DB connection error", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("DB disconnected");
    })

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("DB connection closed due to app termination");
      process.exit(0);
    })

  } catch (error) {
    logger.error("Error connecting to DB", error);
    process.exit(1);
  }
}

export default connectDB;