import Joi from "joi";

export const createExpenseSchema = Joi.object({
  budgetId: Joi.string().required(),

  amount: Joi.number()
    .min(1)
    .required(),

  note: Joi.string()
    .allow("")
    .optional(),

  date: Joi.date()
    .optional(),
});

export const updateExpenseSchema = Joi.object({
  budgetId: Joi.string(),

  amount: Joi.number().min(1),

  note: Joi.string()
    .allow("")
    .optional(),

  date: Joi.date(),
});