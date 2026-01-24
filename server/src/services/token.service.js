const Token = require("../models/token.model");
const { getIO } = require("../socket");
const redis = require("../config/redis");

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

  await redis.rpush(`queue:service:${serviceId}`, token._id.toString());
  const len = await redis.llen(`queue:service:${serviceId}`);
  console.log("Queue length:", len);

  const io = getIO();

  io.emit("token:created", {
    tokenId: token._id,
    tokenNumber: token.tokenNumber,
    serviceId: token.serviceId,
    status: token.status,
  });
  io.emit("queue:updated", { serviceId });

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
