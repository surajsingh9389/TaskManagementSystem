import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import {
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

// Admin-only task management
router.get("/tasks", auth, authorize("admin"), getTasks);
router.put("/tasks/:id", auth, authorize("admin"), updateTask);
router.delete("/tasks/:id", auth, authorize("admin"), deleteTask);

export default router;
