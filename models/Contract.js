const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
{
  username: String,
  invitationCode: String,
  investmentAmount: Number,

  frontIdImage: String,
  backIdImage: String,
  signatureImage: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Contract", ContractSchema);