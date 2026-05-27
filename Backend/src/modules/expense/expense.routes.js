import express from "express";

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "./expense.controller.js";

import { protect } from "../../shared/middleware/auth.middleware.js";

import { validate } from "../../shared/middleware/validate.middleware.js";

import {
  createExpenseSchema,
  updateExpenseSchema,
} from "./expense.validations.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// CREATE
router.post(
  "/createExpense",
  validate(createExpenseSchema),
  createExpense
);

// GET ALL
router.get("/", getExpenses);

// UPDATE
router.put(
  "/:id",
  validate(updateExpenseSchema),
  updateExpense
);

// DELETE
router.delete("/:id", deleteExpense);

export default router;