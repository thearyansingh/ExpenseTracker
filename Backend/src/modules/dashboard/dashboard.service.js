import User from "../auth/auth.model.js";
import Budget from "../budget/budget.model.js";
import Expense from "../expense/expense.models.js";

export const getDashboardData = async (userId, query) => {
  // Get Query Params

  const month = Number(query.month) || new Date().getMonth() + 1;

  const year = Number(query.year) || new Date().getFullYear();

  // Create Date Range

  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 0, 23, 59, 59);

  // Get User

  const user = await User.findById(userId);

  // Get Budgets

  const budgets = await Budget.find({ userId });

  // Get Monthly Expenses

  const expenses = await Expense.find({
    userId,

    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  // Total Budget

  const totalBudget = budgets.reduce((acc, curr) => acc + curr.limitAmount, 0);

  // Total Spent

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Remaining Balance

  const remainingBalance = user.monthlyIncome - totalSpent;

  return {
    month,
    year,

    summary: {
      monthlyIncome: user.monthlyIncome,

      totalBudget,

      totalSpent,

      remainingBalance,
    },
  };
};
