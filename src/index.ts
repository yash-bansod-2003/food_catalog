import { Express } from "express";
import { createServer } from "@/server";
import configuration from "@/config/configuration";
import logger from "@/config/logger";
import { connectDatabase } from "@/config/connect-database";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";
const server: Express = createServer();

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
