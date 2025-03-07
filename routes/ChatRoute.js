const express = require("express");
const router = express.Router();
const {
  saveMessage,
  getMessages2,
} = require("../controllers/ChatController.js");

router.post("/", saveMessage);
router.get("/:sender/:receiver", getMessages2);

module.exports = router;
