import mongoose from "mongoose";
import configuration from "@/config/configuration";
import logger from "@/config/logger";

export const connectDatabase = async () => {
  await mongoose.connect(configuration.database.url!);
  logger.info("Database connected successfully");
};
