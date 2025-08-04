import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import plantsRoutes from "./routes/plantsRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", plantsRoutes);

export default app;
