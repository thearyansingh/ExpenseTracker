import Expense from "./expense.models.js";
import Budget from "../budget/budget.model.js";
import ApiError from "../../shared/utils/apiError.js";
import expenseModels from "./expense.models.js";


export const createExpense = async (data, userId) => {

  // Check budget exists
  const budget = await Budget.findOne({
    _id: data.budgetId,
    userId,
  });

  if (!budget) {
    throw new ApiError(404, "Budget category not found");
  }

  const expense = await Expense.create({
    ...data,
    userId,
  });

  // Calculate total spent for this category
  const expenses = await Expense.aggregate([
    {
      $match: {
        budgetId: budget._id,
      },
    },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: "$amount" },
      },
    },
  ]);

  const totalSpent = expenses[0]?.totalSpent || 0;

  let budgetAlert = null;

  // Budget Warning Logic
  const percentage = (totalSpent / budget.limitAmount) * 100;

  if (percentage >= 100) {
    budgetAlert = {
      status: "exceeded",
      message: `${budget.name} budget exceeded`,
    };
  } else if (percentage >= 80) {
    budgetAlert = {
      status: "warning",
      message: `You have used ${Math.floor(percentage)}% of ${budget.name} budget`,
    };
  }

  return {
    expense,
    budgetAlert,
  };
};

export const getExpenses = async (
  userId,
  query
) => {

  // =====================================
  // Query Params
  // =====================================

  const page =
    Number(query.page) || 1;

  const limit =
    Number(query.limit) || 10;

  const skip =
    (page - 1) * limit;

  const search =
    query.search || "";

  const budgetId =
    query.budgetId || "";

  const sort =
    query.sort || "date";

  const order =
    query.order === "asc"
      ? 1
      : -1;

  const startDate =
    query.startDate;

  const endDate =
    query.endDate;

  // =====================================
  // Dynamic Filter Object
  // =====================================

  const filter = {
    userId,
  };

  // =====================================
  // Search Filter
  // =====================================

  if (search) {
    filter.note = {
      $regex: search,
      $options: "i",
    };
  }

  // =====================================
  // Budget Category Filter
  // =====================================

  if (budgetId) {
    filter.budgetId = budgetId;
  }

  // =====================================
  // Date Range Filter
  // =====================================

  if (startDate || endDate) {

    filter.date = {};

    if (startDate) {
      filter.date.$gte =
        new Date(startDate);
    }

    if (endDate) {
      filter.date.$lte =
        new Date(endDate);
    }
  }

  // =====================================
  // Fetch Expenses
  // =====================================

  // Use the constructed filter (which includes userId) to ensure users only see their own expenses
  const expenses = await Expense.find(filter)
    .populate("budgetId", "name icon color")
    .sort({ [sort]: order })
    .skip(skip)
    .limit(limit);

  const totalExpenses = await Expense.countDocuments(filter);

  // =====================================
  // Pagination Metadata
  // =====================================

  const totalPages =
    Math.ceil(
      totalExpenses / limit
    );

  return {

    expenses,

    pagination: {

      totalExpenses,

      totalPages,

      currentPage: page,

      limit,
    },
  };
};

export const updateExpense = async (expenseId, userId, data) => {
  const expense = await Expense.findOne({ _id: expenseId, userId });
  if (!expense) throw new ApiError(404, "expense not found");
   const expenseData=await Expense.findByIdAndUpdate({_id:expenseId},data,{
      new: true
   })
   return expenseData
};

export const deleteExpense=async(userId,expenseId)=>{
  const expense = await Expense.findOne({ _id: expenseId, userId });
  if (!expense) throw new ApiError(404, "expense not found");
  await expense.deleteOne();
  return expense;
};