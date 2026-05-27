import Joi from "joi";

// Strong password: min 8 chars, at least 1 upper, 1 lower, 1 number, 1 special
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/;

export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s'\-]+$/)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least {#limit} characters",
      "string.max": "Name must be less than or equal to {#limit} characters",
      "string.pattern.base": "Name contains invalid characters",
      "any.required": "Name is required",
    }),

  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Enter a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base": "Password must be 8-128 characters long and include uppercase, lowercase, number and special character",
    "any.required": "Password is required",
  }),

  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password does not match password",
      "any.required": "Confirm password is required",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least {#limit} characters",
    "any.required": "Password is required",
  }),
});


