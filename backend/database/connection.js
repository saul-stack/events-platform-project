const dotenv = require("dotenv");
const { Pool } = require("pg");

const environment = process.env.NODE_ENV || "development";
console.log(`Environment: ${environment}`);
console.log(`PGDATABASE: ${process.env.PGDATABASE}`);
console.log(`PGUSER: ${process.env.PGUSER}`);
console.log(`PGHOST: ${process.env.PGHOST}`);
console.log(`PGPORT: ${process.env.PGPORT}`);

if (environment === "development") {
  dotenv.config({ path: `${__dirname}/../../.env.development` });
} else {
  dotenv.config();
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
