import express from "express";

import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "./budget.controller.js";

import { protect } from "../../shared/middleware/auth.middleware.js";

import { validate } from "../../shared/middleware/validate.middleware.js";

import {
  createBudgetSchema,
  updateBudgetSchema,
} from "./budget.validation.js";

const router = express.Router();

// All routes protected
router.use(protect);

// Create Budget
router.post(
  "/createBudget",
  validate(createBudgetSchema),
  createBudget
);

// Get All Budgets
router.get("/", getBudgets);

// Update Budget
router.put(
  "/:id",
  validate(updateBudgetSchema),
  updateBudget
);

// Delete Budget
router.delete("/:id", deleteBudget);

export default router;