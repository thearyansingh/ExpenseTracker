
import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as expenseServices from "../expense/expense.service.js";

export const createExpense=asyncHandler(async(req,res)=>{
    const budget= await  expenseServices.createExpense(req.body,req.user.id);

      res.status(201).json({
    success: true,
    data: budget,
  });
});


export const  getExpenses=asyncHandler(async(req,res)=>{
    const budget= await  expenseServices.getExpenses(req.user.id,req.query);
     (budget)
    res.status(201).json({
    success: true,
    data: budget,
  });
})

export const updateExpense = asyncHandler(async (req, res) => {

  const expense = await expenseServices.updateExpense(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    data: expense,
  });
});


export const deleteExpense = asyncHandler(async (req, res) => {

  await expenseServices.deleteExpense(
    req.user.id,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  });
});

