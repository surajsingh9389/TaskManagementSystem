import express from "express";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan"
import userTaskRoutes from "./routes/user.task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminTaskRoutes from "./routes/admin.task.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userTaskRoutes);
app.use("/api/v1/admin", adminTaskRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running..." });
});

// Global error handler
app.use(errorHandler);

export default app;
