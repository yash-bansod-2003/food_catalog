import { Express } from "express";
import { createServer } from "@/server";
import configuration from "@/common/config/configuration";
import logger from "@/common/config/logger";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";
const server: Express = createServer();

server.listen(port, host, () => {
  try {
    logger.info(`Server Listening on  http://${host}:${port}`);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
});
