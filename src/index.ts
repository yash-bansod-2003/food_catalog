import { Application } from "express";
import { createServer } from "@/server.js";
import configuration from "@/config/configuration.js";
import logger from "@/config/logger.js";
import { connectDatabase } from "@/config/connect-database.js";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";
const server: Application = createServer();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
server.listen(port, host, async () => {
  try {
    await connectDatabase();
    logger.info(`Server Listening on  http://${host}:${port}`);
  } catch (error: unknown) {
    logger.error(error);
    process.exit(1);
  }
});
