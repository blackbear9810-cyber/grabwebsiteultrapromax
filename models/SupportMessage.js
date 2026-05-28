const mongoose = require("mongoose");

const supportMessageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    invitationCode: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000),
      index: { expires: 0 }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SupportMessage",
  supportMessageSchema
);