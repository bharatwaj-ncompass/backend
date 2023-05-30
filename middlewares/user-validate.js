//Importing
const {
  read_deleteSchema,
  createSchema,
  updateSchema,
} = require("../models/schema");
const { errorHandler } = require("../helpers/error-handler");

//Validation Functions for User
const readValidate = async (req, res, next) => {
  try {
    await read_deleteSchema.validateAsync();
    next();
  } catch (error) {
    errorHandler(400, false, error.message, [], res);
  }
};

const createValidate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    errorHandler(400, false, error.message, [], res);
  }
};

const updateValidate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    errorHandler(400, false, error.message, [], res);
  }
};

const deleteValidate = async (req, res, next) => {
  try {
    await read_deleteSchema.validateAsync();
    next();
  } catch (error) {
    errorHandler(400, false, error.message, [], res);
  }
};

//Exporting
module.exports = {
  createValidate,
  updateValidate,
  deleteValidate,
  readValidate,
};
