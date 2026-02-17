import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", auth, createTask);

// Admin get all tasks
// User get only their own tasks
router.get("/", auth, getTasks);

// Admin can update any task
// User can update only their own task
router.put("/:id", auth, updateTask);

// Admin can delete any task
// User can delete only their own task
router.delete("/:id", auth, deleteTask);

export default router;
