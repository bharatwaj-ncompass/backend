const mysql = require("mysql2");
const { errorHandler } = require('../helpers/error-handler');
require("dotenv").config();

const dbConnect = () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
    return connection;
  } catch (err) {
    errorHandler(500, false, err.message, [], res)
  }
};
const queryExecutor = (query, val) => dbConnect().promise().execute(query, val);

module.exports = { dbConnect, queryExecutor };