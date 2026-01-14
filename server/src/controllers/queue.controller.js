const getServiceQueue = require("../services/queue.service");
const Token = require("../models/token.model");

const getStaffQueueView = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const queue = await getServiceQueue(serviceId);

    res.json({
      success: true,
      data: queue,
    });
  } catch (err) {
    next(err);
  }
};

const getCustomerQueueStatus = async (req, res, next) => {
  try {
    const { tokenId } = req.params;

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const aheadCount = await Token.countDocuments({
      serviceId: token.serviceId,
      status: "WAITING",
      createdAt: { $lt: token.createdAt },
    });

    const serving = await Token.findOne({
      serviceId: token.serviceId,
      status: "SERVING",
    });

    res.json({
      success: true,
      data: {
        tokenNumber: token.tokenNumber,
        status: token.status,
        peopleAhead: aheadCount,
        currentlyServing: serving?.tokenNumber || null,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStaffQueueView, getCustomerQueueStatus };