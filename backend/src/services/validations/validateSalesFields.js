const { requiredMessageSchema, minCharMessageSchema } = require('./schemas');

const validateSalesFields = (objKeys) => {
  const { error: requiredFieldError } = requiredMessageSchema.validate(objKeys);

  if (requiredFieldError) {
    return { status: 'REQUIRED_VALUE', message: requiredFieldError.message };
  }

  const { error: minCharError } = minCharMessageSchema.validate(objKeys);

  if (minCharError) {
    return { status: 'INVALID_VALUE', message: minCharError.message };
  }
};

module.exports = {
  validateSalesFields,
};