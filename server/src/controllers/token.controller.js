const {generateTokenForService,getNextWaitingToken} = require("../services/token.service");
const Counter = require("../models/counter.model");
const Token = require("../models/token.model");
const User = require("../models/user.model");

const createToken = async (req, res, next) => {
  try {
    const { serviceId, priority } = req.body;

    const token = await generateTokenForService(serviceId, priority);

    res.status(201).json({
      success: true,
      data: token,
    });
  } catch (err) {
    next(err);
  }
};

const callNextToken = async (req, res, next) => {
  try {
    const staff = await User.findById(req.user.id);
    const staffServiceId = staff.serviceId;
    const { counterId } = req.body;

    if (!staffServiceId) {
      return res.status(400).json({
        message: "Staff not assigned to any service",
      });
    }

    const counter = await Counter.findById(counterId);
    if (!counter || counter.status === "PAUSED") {
      return res.status(400).json({
        message: "Counter is paused or invalid",
      });
    }

    // Check if already serving
    const active = await Token.findOne({
      serviceId: staffServiceId,
      status: "SERVING",
    });

    if (active) {
      return res.status(400).json({
        message: "Finish current token first",
      });
    }

    // ATOMIC OPERATION
    const token = await Token.findOneAndUpdate(
      {
        serviceId: staffServiceId,
        status: "WAITING",
      },
      {
        status: "SERVING",
        counterId,
        servedAt: new Date(),
      },
      {
        sort: { createdAt: 1 },
        new: true,
      }
    );

    if (!token) {
      return res.status(404).json({
        message: "No waiting tokens",
      });
    }

    res.json({
      success: true,
      data: token,
    });
  } catch (err) {
    next(err);
  }
};

const completeToken = async (req, res, next) => {
  const token = await Token.findOneAndUpdate(
    {
      _id: req.params.tokenId,
      status: "SERVING",
    },
    { status: "COMPLETED", completedAt: new Date() },
    { new: true }
  );

  if (!token) {
    return res.status(400).json({ message: "Invalid token state" });
  }

  res.json({ success: true, data: token });
};

const skipToken = async (req, res, next) => {
  try {
    const { tokenId } = req.params;

    const token = await Token.findById(tokenId);

    if (!token || token.status !== "SERVING") {
      return res.status(400).json({ message: "Invalid token state" });
    }

    token.status = "SKIPPED";
    await token.save();

    res.json({ success: true, data: token });
  } catch (err) {
    next(err);
  }
};

const getTokenStatus = async (req, res, next) => {
  try {
    const tokenId = req.params.tokenId;

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    // Count WAITING tokens created before this token
    const peopleAhead = await Token.countDocuments({
      serviceId: token.serviceId,
      status: "WAITING",
      createdAt: { $lt: token.createdAt },
    });

    // Find currently serving token
    const serving = await Token.findOne({
      serviceId: token.serviceId,
      status: "SERVING",
    });

    res.json({
      success: true,
      data: {
        tokenNumber: token.tokenNumber,
        status: token.status,
        peopleAhead,
        currentlyServing: serving
          ? serving.tokenNumber
          : null,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createToken,
    callNextToken,
    completeToken,
    skipToken,
    getTokenStatus
};  