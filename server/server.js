import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// A test API route
app.use("/auth", authRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
