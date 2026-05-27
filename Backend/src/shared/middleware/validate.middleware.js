// schema is a Joi schema object
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

    if (error) {
      // Build a readable errors object
      const details = error.details.map((d) => ({ message: d.message, path: d.path }));
      return res.status(400).json({ success: false, errors: details });
    }

    // Replace req.body with the validated and sanitized value
    req.body = value;
    console.log(value)
    next();
  };
};

export default validate;
