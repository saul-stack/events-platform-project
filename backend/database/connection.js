const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../.env.development` });
if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}
const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
