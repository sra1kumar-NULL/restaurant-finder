require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  database: process.env.DATABASE,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
});
module.exports = pool;
