const express = require("express");
const {
  displayOneUser,
  displayUser,
  insertdata,
  updatedata,
  deletedata,
  login,
  signup,
  getme,
} = require("../controllers/user-controller");
const auth = require("../middlewares/jwt-validate");
const {
  createValidate,
  updateValidate,
  deleteValidate,
  readValidate,
} = require("../middlewares/user-validate");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getme", auth, getme);
router.get("/readall", displayUser);
router.get("/:id", auth, readValidate, displayOneUser);
router.post("/create", createValidate, insertdata);
router.patch("/update/:id",  updateValidate, updatedata);
router.delete("/delete/:id", deleteValidate, deletedata);

module.exports = { router };
