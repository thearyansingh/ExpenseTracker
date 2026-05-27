import express from "express";
import { register, login, refreshToken, logout } from "./auth.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { asyncHandler } from "../../shared/middleware/asyncHandler.js";
import User from "./auth.model.js";

export const authrouter = express.Router();

// Validate incoming request bodies using Joi schemas
authrouter.post("/register", validate(registerSchema), register);
authrouter.post("/login", validate(loginSchema), login);
authrouter.post("/refresh-token", refreshToken);
authrouter.post("/logout", protect, logout);
authrouter.get(
  "/me",
  protect,
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }),
);
authrouter.put(
  "/updateIncome",
  protect,
  asyncHandler(async (req, res) => {
    const user = req.user.id;
    
    const updateData = await User.findByIdAndUpdate({ _id:user },req.body, {
      new: true,
    });
   res.json({
      success: true,
      user: updateData
    });
  }),

);

// 1. User logs in → gets access + refresh token
// 2. Access token expires (15 min)
// 3. Frontend calls /refresh-token
// 4. Server verifies refresh token
// 5. New access token issued
