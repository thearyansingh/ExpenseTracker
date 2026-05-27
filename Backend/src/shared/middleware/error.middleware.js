// Centralized error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Log for debugging
  console.error(err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  // If error contains validation details (Joi), normalize
  let errors = undefined;
  if (err.details && Array.isArray(err.details)) {
    errors = err.details.map((d) => ({ message: d.message, path: d.path }));
  } else if (err.errors) {
    errors = err.errors;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export default errorHandler;
