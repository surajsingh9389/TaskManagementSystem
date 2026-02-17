import Task from "../models/task.model.js";
import { AppError } from "../utils/AppError.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Title and description cannot be empty
    if (!title) {
      throw new AppError("Title is required", 400);
    }

    // Task create stored in db
    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    // return newly created task with success message
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    // centralized error handling
    next(error); 
  }
};


export const getTasks = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    // If admin, find all. If user, find only theirs.
    const tasks =
      role === "admin"
        ? await Task.find()
        : await Task.find({ user: id });

    // return the data
    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    // centralized error handling
    next(error); 
  }
};


export const updateTask = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id: taskId } = req.params;
    const { title, description, status} = req.body;

    if (!title && !description) {
      throw new AppError("Nothing to update", 400);
    }

    if (!title) {
      throw new AppError("Title is required", 400);
    }

    // Admin sees all, User sees only theirs
    const filter =
      role === "admin"
        ? { _id: taskId }
        : { _id: taskId, user: userId };

    // Perform the update
    const updatedTask = await Task.findOneAndUpdate(
      filter,
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      throw new AppError("Task not found or unauthorized", 404);
    }

    // send response message with updated task
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    // centralized error handling
    next(error); 
  }
};


export const deleteTask = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id: taskId } = req.params;

    // Admin sees all, User sees only theirs
    const filter =
      role === "admin"
        ? { _id: taskId }
        : { _id: taskId, user: userId };

    // Attempt to find and delete
    const deletedTask = await Task.findOneAndDelete(filter);

    if (!deletedTask) {
      throw new AppError(
        "Task not found or you are not authorized to delete it",
        404
      );
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      id: deletedTask._id,
    });

  } catch (error) {
    // centralized error handling
    next(error); 
  }
};
