import express from "express";
import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
