import express from "express";

import { getDashboard } from "./dashboard.controller.js";

import { protect } from "../../shared/middleware/auth.middleware.js";

const dashboardRouter = express.Router();


dashboardRouter.get(
  "/",
  protect,
  getDashboard
);

export default dashboardRouter;