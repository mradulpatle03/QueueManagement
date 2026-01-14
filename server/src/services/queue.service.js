const Token = require("../models/token.model");

const getServiceQueue = async (serviceId) => {
  const waiting = await Token.find({
    serviceId,
    status: "WAITING",
  })
    .sort({ createdAt: 1 })
    .lean();

  const serving = await Token.findOne({
    serviceId,
    status: "SERVING",
  }).lean();

  const lastCompleted = await Token.findOne({
    serviceId,
    status: "COMPLETED",
  })
    .sort({ updatedAt: -1 })
    .lean();

  return { waiting, serving, lastCompleted };
};

module.exports = { getServiceQueue };