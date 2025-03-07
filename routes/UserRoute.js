const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  getAllUsers,
} = require("../controllers/UserController");

router.post("/register", Register);
router.post("/login", Login);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
