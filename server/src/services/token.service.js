const Token = require("../models/token.model");

const generateTokenForService = async (serviceId, priority = 0) => {
  const lastToken = await Token.findOne({ serviceId })
    .sort({ tokenNumber: -1 })
    .lean();

  const nextNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

  const token = await Token.create({
    serviceId,
    tokenNumber: nextNumber,
    priority,
  });

  return token;
};

const getNextWaitingToken = async (serviceId) => {
  return Token.findOne({
    serviceId,
    status: "WAITING",
  }).sort({ createdAt: 1 });
};

module.exports = {
  generateTokenForService,
  getNextWaitingToken,
};