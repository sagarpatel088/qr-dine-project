const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qr_dine",
  password: "Sagar088",
  port: 5432,
});

module.exports = pool;