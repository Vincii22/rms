import express from "express";
import db from "./config/db.js"; // ✅ Use mysql2 connection
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Check database connection once
db.getConnection()
  .then((connection) => {
    console.log("✅ Connected to MySQL");
    connection.release(); // Release the connection back to the pool

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);

    app.get("/", (req, res) => res.send("API is running..."));

    // Start server
    app.listen(5000, () => console.log("🚀 Backend running on port 5000"));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
