import * as authService from "./auth.service.js";
import { asyncHandler } from "../../shared/middleware/asyncHandler.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS).status(201).json({
    success: true,
    accessToken,
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS).status(200).json({
    success: true,
    accessToken,
    user,
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refreshAccessToken(token);

  res
    .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
    .json({
      success: true,
      accessToken,
    });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user.id);

  res.clearCookie("refreshToken").json({
    success: true,
    message: "Logged out successfully",
  });
});

