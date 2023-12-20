// Schema for Server Side Validation

const Joi = require("joi");

const productSchema = Joi.object({
  img: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  desc: Joi.string().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  comments: Joi.string().required(),
});

module.exports = { productSchema, reviewSchema };
