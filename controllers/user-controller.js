//Importing
const { dbConnect, queryExecutor } = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { successHandler } = require("../helpers/success-handler");
const { errorHandler } = require("../helpers/error-handler");

//Function for User (CRUD)
const signup = async (req, res, next) => {
  const pass = req.body.password;
  const hash = await bcrypt.hash(pass, 10);
  let data = {
    id: req.body.id,
    email: req.body.email,
    password: hash,
    phone: req.body.phone,
    username: req.body.username,
  };
  try {
    const query = "select email from user where id = ?";
    const val = [data.id];
    const [rows, fields] = await queryExecutor(query, val);
    if (rows.length === 0) {
      const val = [
        data.id,
        data.email,
        data.password,
        data.phone,
        data.username,
      ];
      const query = "Insert into user values (?,?,?,?,?)";
      const [] = await queryExecutor(query, val);
      successHandler(
        200,
        true,
        "Inserted User details successfully",
        data,
        res
      );
    } else {
      errorHandler(400, false, "User ALready Exist", [], res);
    }
  } catch (error) {
    errorHandler(400, false, "Sign Up Revoked", [], res);
  } finally {
    dbConnect().end();
  }
};

const login = async (req, res, next) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  let usrdata = {
    id: req.body.id,
    email: req.body.email,
  };
  const token = jwt.sign(usrdata, process.env.JWT_TOKEN_SECRET);
  try {
    const query = "select password from user where email = ?";
    const val = [data.email];
    const [rows, fields] = await queryExecutor(query, val);
    if (bcrypt.compareSync(data.password, rows[0].password)) {
      successHandler(200, true, "Login Successfull", token, res);
    } else {
      errorHandler(400, false, "Login Unsuccessfull", [], res);
    }
  } catch (error) {
    errorHandler(400, false, "Login Unsuccessfull", [], res);
  } finally {
    dbConnect().end();
  }
};

const getme = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(data);
    const query = "select * from user where email = ?";
    const val = [data.email];
    const [rows, fields] = await queryExecutor(query, val);
    if (rows) {
      successHandler(200, true, "Authentication Successfull", rows, res);
    } else {
      errorHandler(400, false, "Authentication Unsuccessfull", [], res);
    }
  } catch (error) {
    errorHandler(400, false, "Get Me not working", [], res);
  } finally {
    dbConnect().end();
  }
};

const displayUser = async (req, res) => {
  try {
    const val = null;
    const query = "Select * from user";
    const [rows, fields] = await queryExecutor(query, val);
    successHandler(200, true, "Displayed the users data", rows, res);
  } catch (error) {
    errorHandler(400, false, "Users data cannot be retrieved", [], res);
  } finally {
    dbConnect().end();
  }
};

const displayOneUser = async (req, res) => {
  try {
    const { id } = req.params
    const val = [id]
    const query = "Select * from user where id = ?";
    const [rows] = await queryExecutor(query, val);
    successHandler(200, true, `User details with id: ${id}`, rows, res);
  } catch (error) {
    errorHandler(400, false, "Cannot retrieve user details", [], res);
  } finally {
    dbConnect().end();
  }
};

const insertdata = async (req, res) => {
  const pass = req.body.password;
  const hash = await bcrypt.hash(pass, 10);
  let data = {
    id: req.body.id,
    email: req.body.email,
    password: hash,
    phone: req.body.phone,
    username: req.body.username,
  };
  try {
    const val = [data.id, data.email, data.password, data.phone, data.username];
    const query = "Insert into user values (?,?,?,?,?)";
    const [] = await queryExecutor(query, val);
    successHandler(201, true, "New user created and data inserted", data, res);
  } catch (error) {
    errorHandler(400, false, "User details not inserted", [], res);
  } finally {
    dbConnect().end();
  }
};

const updatedata = async (req, res) => {
  const { id } = req.params;
  let data = {
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
  };
  try {
    const val = [data.email, data.phone, data.username, id];
    const query = "update user set email=?, phone=?, username=? where id=?";
    await queryExecutor(query, val);
    successHandler(201, true, "User details updated", {
      email: data.email,
      phone: data.phone,
      username: data.username,
    }, res);
  } catch (error) {
    errorHandler(400, false, "User details not updated", [], res);
  } finally {
    dbConnect().end();
  }
};

const deletedata = async (req, res) => {
  try {
    const val = [req.params.id];
    const query = "delete from user where id=?";
    const [] = await queryExecutor(query, val);
    successHandler(200, true, `Removed user whose Id: ${val}`, [], res);
  } catch (error) {
    errorHandler(400, false, "User details not deleted", [], res);
  } finally {
    dbConnect().end();
  }
};

//Exporting
module.exports = {
  signup,
  login,
  getme,
  displayUser,
  displayOneUser,
  insertdata,
  updatedata,
  deletedata,
};
