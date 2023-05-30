const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const createSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .min(7)
    .max(15)
    .required(),
  phone: Joi.string().min(10).max(10).required(),
  username: Joi.string().min(5).max(200).required(),
});

const updateSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().optional(),
  password: joiPassword.forbidden(),
  phone: Joi.string().min(10).max(10).optional(),
  username: Joi.string().min(5).max(200).optional(),
});

const read_deleteSchema = Joi.object({
  id: Joi.number().required(),
});

module.exports = { createSchema, updateSchema, read_deleteSchema };
