const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  googleLogin,
  getAllUsers,
} = require("../controllers/UserController");

router.post("/register", Register);
router.post("/login", Login);
router.post("/google-login", googleLogin);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
