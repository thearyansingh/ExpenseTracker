import Budget from "./budget.model.js";
import ApiError from "../../shared/utils/apiError.js";

// Create Budget
export const createBudget = async (data, userId) => {

  const existingBudget = await Budget.findOne({
    userId,
    name: data.name,
  });

  if (existingBudget) {
    throw new ApiError(400, "Budget category already exists");
  }

  const budget = await Budget.create({
    ...data,
    userId,
  });

  return budget;
};

// Get All Budgets
export const getBudgets = async (userId) => {

  const budgets = await Budget.find({ userId })
    .sort({ createdAt: -1 });

  return budgets;
};

// Update Budget
export const updateBudget = async (budgetId, userId, data) => {

  const budget = await Budget.findOne({
    _id: budgetId,
    userId,
  });

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  Object.assign(budget, data);

  await budget.save();

  return budget;
};

// Delete Budget
export const deleteBudget = async (budgetId, userId) => {

  const budget = await Budget.findOneAndDelete({
    _id: budgetId,
    userId,
  });

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  return;
};