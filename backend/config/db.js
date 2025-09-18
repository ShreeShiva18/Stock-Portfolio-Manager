const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "Shreeshiva18@", 
  database: "stock", 
});

module.exports = db;
