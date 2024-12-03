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
};

export default configuration;
