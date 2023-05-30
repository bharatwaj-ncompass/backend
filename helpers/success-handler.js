//Importing
const zlib = require("zlib");

//Function for success response
const successHandler = async (statusCode, success, message, data, res) => {
  const responseData = {
    success,
    message,
    data,
  };
  const response = await new Promise((res, rej) => {
    zlib.gzip(JSON.stringify(responseData), (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Encoding", "gzip");
  res.status(statusCode).send(response);
};

//Exporting
module.exports = { successHandler };
