const Joi = require('joi');

const saleObjSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.required(),
});

const saleObjMinCharSchema = Joi.object({
  productId: Joi.number().min(1),
  quantity: Joi.number().min(1),
});

const requiredMessageSchema = Joi.array().items(saleObjSchema).messages({ 
  'any.required': '"{#key}" is required',
});

const minCharMessageSchema = Joi.array().items(saleObjMinCharSchema).messages({
  'number.min': '"{#key}" must be greater than or equal to 1',
});

module.exports = {
  requiredMessageSchema,
  minCharMessageSchema,
};