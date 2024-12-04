import mongoose from "mongoose";
import configuration from "@/config/configuration.js";
import logger from "@/config/logger.js";

export const connectDatabase = async () => {
  await mongoose.connect(configuration.database.url);
  logger.info("Database connected successfully");
};
