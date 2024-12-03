import mongoose from "mongoose";
import configuration from "@/common/config/configuration";
import logger from "@/common/config/logger";

export const connectDatabase = async () => {
  await mongoose.connect(configuration.database.url!);
  logger.info("Database connected successfully");
};
