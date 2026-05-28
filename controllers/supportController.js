const SupportMessage = require("../models/SupportMessage");


// USER SEND MESSAGE
exports.sendMessage = async (req, res) => {

  try {

    const {
      username,
      inviteCode,
      message,
      sessionId,
    } = req.body;

    const newMessage = new SupportMessage({
      username,
      invitationCode: inviteCode,
      message,
      sender: "user",
      status: "sent",
      sessionId,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });

  }
};


// USER FETCH CHAT
exports.getUserMessages = async (req, res) => {

  try {

    const { invitationCode } = req.params;

    const messages = await SupportMessage.find({
      invitationCode,
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to load messages",
    });

  }
};


// ADMIN GET ALL MESSAGES
exports.getAllMessages = async (req, res) => {

  try {

    const messages = await SupportMessage.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });

  }
};


// ADMIN REPLY
exports.replyMessage = async (req, res) => {

  try {

    const {
      username,
      invitationCode,
      message,
      messageId,
    } = req.body;

    // Find original user message
    const originalMessage = await SupportMessage.findById(messageId);

    if (!originalMessage) {
      return res.status(404).json({
        success: false,
        message: "Original message not found",
      });
    }

    // Save admin reply
    const reply = new SupportMessage({
      username,
      invitationCode,
      message,
      sender: "admin",
      status: "delivered",
      sessionId: originalMessage.sessionId,
    });

    await reply.save();

    // Update old user message status
    await SupportMessage.findByIdAndUpdate(
      messageId,
      {
        status: "replied",
      }
    );

    res.json({
      success: true,
      message: "Reply sent successfully",
      data: reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });

  }

};