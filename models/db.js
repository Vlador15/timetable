const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "1512",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
