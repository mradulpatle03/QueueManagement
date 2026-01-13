const {generateTokenForService,getNextWaitingToken} = require("../services/token.service");
const Counter = require("../models/counter.model");

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
    const { serviceId, counterId } = req.body;

    const counter = await Counter.findById(counterId);
    if (counter.status === "PAUSED") {
      return res.status(400).json({ message: "Counter is paused" });
    }

    const token = await getNextWaitingToken(serviceId);

    if (!token) {
      return res.status(404).json({ message: "No waiting tokens" });
    }

    token.status = "SERVING";
    token.counterId = counterId;
    token.servedAt = new Date();
    await token.save();

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
    const { tokenId } = req.params;

    const token = await Token.findById(tokenId);

    if (!token || token.status !== "SERVING") {
      return res.status(400).json({ message: "Invalid token state" });
    }

    token.status = "COMPLETED";
    await token.save();

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

module.exports = {
    createToken,
    callNextToken,
    completeToken,
    skipToken
};  