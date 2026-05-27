import Joi from "joi";

export const createBudgetSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),

  limitAmount: Joi.number()
    .min(1)
    .required(),

  icon: Joi.string()
    .optional(),

  color: Joi.string()
    .optional(),
});

export const updateBudgetSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30),

  limitAmount: Joi.number()
    .min(1),

  icon: Joi.string(),

  color: Joi.string(),
});