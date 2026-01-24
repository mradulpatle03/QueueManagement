const {
  generateTokenForService,
  getNextWaitingToken,
} = require("../services/token.service");
const Counter = require("../models/counter.model");
const Token = require("../models/token.model");
const User = require("../models/user.model");
const { getIO } = require("../socket");
const redis = require("../config/redis");

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
    // Get staff & service
    const staff = await User.findById(req.user.id);
    const serviceId = staff.serviceId;
    const { counterId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        message: "Staff not assigned to any service",
      });
    }

    // Validate counter
    const counter = await Counter.findById(counterId);
    if (!counter || counter.status === "PAUSED") {
      return res.status(400).json({
        message: "Counter is paused or invalid",
      });
    }

    // Check if this counter is already serving
    const servingKey = `serving:counter:${counterId}`;
    const activeTokenId = await redis.get(servingKey);

    if (activeTokenId) {
      return res.status(400).json({
        message: "Finish current token first",
      });
    }

    // Pop next token from Redis queue
    const queueKey = `queue:service:${serviceId}`;
    const tokenId = await redis.lpop(queueKey);

    if (!tokenId) {
      return res.status(404).json({
        message: "No waiting tokens",
      });
    }

    // Update token in Mongo
    const token = await Token.findById(tokenId);
    token.status = "SERVING";
    token.counterId = counterId;
    token.servedAt = new Date();
    await token.save();

    // Mark counter as busy in Redis
    await redis.set(servingKey, tokenId);

    // Emit socket event
    const io = getIO();
    io.emit("token:called", {
      tokenId: token._id,
      tokenNumber: token.tokenNumber,
      serviceId: token.serviceId,
      counterId: token.counterId,
      status: token.status,
    });
    io.emit("queue:updated", { serviceId });

    res.json({
      success: true,
      data: token,
    });
  } catch (err) {
    next(err);
  }
};

const completeToken = async (req, res, next) => {
   try {
    const tokenId = req.params.tokenId;

    const token = await Token.findById(tokenId);
    if (!token || token.status !== "SERVING") {
      return res.status(400).json({ message: "Invalid token" });
    }

    token.status = "COMPLETED";
    token.completedAt = new Date();
    await token.save();

    // free counter
    await Counter.findByIdAndUpdate(token.counterId, {
      status: "ACTIVE",
    });
    const io = getIO();
    io.emit("token:completed", {
      tokenId: token._id,
      tokenNumber: token.tokenNumber,
      serviceId: token.serviceId,
      counterId: token.counterId,
      status: token.status,
    });

    res.json({ success: true, data: token });
  } catch (err) {
    next(err);
  }
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
        currentlyServing: serving ? serving.tokenNumber : null,
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
  getTokenStatus,
};
