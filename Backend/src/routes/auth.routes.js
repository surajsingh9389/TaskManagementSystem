import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validatiors/auth.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

// Public routes with coustom validators

router.post("/register",registerValidator, validate,register);
router.post("/login",loginValidator, validate, login);

export default router;
