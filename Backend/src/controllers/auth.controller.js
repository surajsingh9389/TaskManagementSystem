import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { AppError } from "../utils/AppError.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("required all fields", 400);
    }

    const userExists = await User.findOne({ email });

    // checking if user already exist or not
    if (userExists) {
      throw new AppError("User already exists", 409);
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // jwt token generation
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });

  } catch (error) {
    // centralized error handling
    next(error); 
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("All fields required", 400);
    }

    // finding user with password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    // comparing hashpassword
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user._id, user.role);

    // response with jwt token
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });

  } catch (error) {
    // centralized error handling
    next(error); 
  }
};
