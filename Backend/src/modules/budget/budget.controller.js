import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as budgetService from "./budget.service.js";

// Create Budget
export const createBudget = asyncHandler(async (req, res) => {

  const budget = await budgetService.createBudget(
    req.body,
    req.user.id
  );

  res.status(201).json({
    success: true,
    data: budget,
  });
});

// Get All Budgets
export const getBudgets = asyncHandler(async (req, res) => {


  const budgets = await budgetService.getBudgets(
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: budgets,
  });
});

// Update Budget
export const updateBudget = asyncHandler(async (req, res) => {

  const budget = await budgetService.updateBudget(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    data: budget,
  });
});

// Delete Budget
export const deleteBudget = asyncHandler(async (req, res) => {

  await budgetService.deleteBudget(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Budget deleted successfully",
  });
});