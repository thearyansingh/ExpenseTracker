import asyncHandler from "../../shared/middleware/asyncHandler.js";
import { getDashboardData } from "./dashboard.service.js";
export const getDashboard = asyncHandler(
  async (req, res) => {

    const dashboardData =
      await getDashboardData(
        req.user.id,
        req.query
      );

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  }
);