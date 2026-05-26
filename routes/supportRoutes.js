const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getUserMessages,
  getAllMessages,
  replyMessage,
} = require("../controllers/supportController");


// USER SEND MESSAGE
router.post(
  "/send-message",
  sendMessage
);


// USER FETCH CHAT
router.get(
  "/user-messages/:invitationCode",
  getUserMessages
);


// ADMIN FETCH ALL
router.get(
  "/all-messages",
  getAllMessages
);


// ADMIN REPLY
router.post(
  "/reply-message",
  replyMessage
);

module.exports = router;