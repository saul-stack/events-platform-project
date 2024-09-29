const dotenv = require("dotenv");
const { Pool } = require("pg");

const environment = process.env.NODE_ENV || "development";

if (environment === "development") {
  dotenv.config({ path: `${__dirname}/../.env.development` });
}

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

const poolConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

if (environment !== "development") {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(poolConfig);

module.exports = db;
