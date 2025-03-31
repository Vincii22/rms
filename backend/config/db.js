import mysql from "mysql2/promise"; // ✅ Use promise-based MySQL2

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rms",
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0,
});

export default db;
