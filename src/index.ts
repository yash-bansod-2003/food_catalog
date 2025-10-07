import { Application } from "express";
import { createServer } from "@/server.js";
import configuration from "@/config/configuration.js";
import logger from "@/config/logger.js";
import { connectDatabase } from "@/config/connect-database.js";
import { KafkaBroker } from "@/common/services/kafka.js";

const port = configuration.port ? parseInt(configuration.port) : 5000;
const host = configuration.host ?? "localhost";
const server: Application = createServer();
const kafkaMessageBroker = new KafkaBroker({
  clientId: configuration.kafka.clientId,
  brokers: configuration.kafka.brokers,
});
server.listen(port, host, async () => {
  try {
    await connectDatabase();
    await kafkaMessageBroker.connect();
    logger.info("Kafka connected successfully");
    logger.info(`Server Listening on  http://${host}:${port}`);
  } catch (error: unknown) {
    logger.error(error);
    process.exit(1);
  }
});
