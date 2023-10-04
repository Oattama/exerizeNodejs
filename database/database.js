const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "exerize",
});

module.exports = dbConnection;
