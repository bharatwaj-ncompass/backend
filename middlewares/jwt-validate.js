//Importing
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/error-handler");

//Function for authorization
const auth = (req, res, next) => {
  try {
    const usr = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const userdetails = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (usr.email === userdetails.email) next();
    else {
      errorHandler(400, false, "Unauthorized Access", [], res);
    }
  } catch (error) {
    errorHandler(400, false, "Unauthorized Access", [], res);
    console.log(error);
  }
};

//Exporting
module.exports = auth;
