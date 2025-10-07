import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

const configuration = {
  node_env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwks_uri: process.env.JWKS_URI,
  aws: {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || "catalog-service",
    brokers: process.env.KAFKA_BROKERS
      ? process.env.KAFKA_BROKERS.split(",")
      : ["localhost:9092"],
  },
};

export default configuration;
