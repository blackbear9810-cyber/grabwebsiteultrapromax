const Contract = require("../models/Contract");

exports.createContract = async (req, res) => {
  try {

    const {
      username,
      invitationCode,
      investmentAmount
    } = req.body;

    const contract = await Contract.create({

      username,
      invitationCode,
      investmentAmount,

      frontIdImage: req.files.frontIdImage?.[0]?.path || "",

      backIdImage: req.files.backIdImage?.[0]?.path || "",

      signatureImage:
        req.files.signatureImage?.[0]?.path || ""
    });

    res.status(201).json({
      success: true,
      message: "Contract submitted successfully",
      contract
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Contract submission failed"
    });

  }
};

exports.getContracts = async (req, res) => {

  try {

    const contracts = await Contract.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      contracts
    });

  } catch (err) {

    res.status(500).json({
      success: false
    });

  }
};