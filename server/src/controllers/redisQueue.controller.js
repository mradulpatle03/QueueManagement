const redis = require("../config/redis");
const Token = require("../models/token.model");

const getQueueStatus = async (req, res, next) => {
  try {
    const { serviceId, tokenId } = req.params;

    // People ahead
    const queueKey = `queue:service:${serviceId}`;
    const queue = await redis.lrange(queueKey, 0, -1);
    const peopleAhead = queue.indexOf(tokenId);

    // Currently serving (any counter)
    const servingToken = await Token.findOne({
      serviceId,
      status: "SERVING",
    }).sort({ servedAt: -1 });

    res.json({
      success: true,
      data: {
        peopleAhead: peopleAhead === -1 ? 0 : peopleAhead,
        currentlyServing: servingToken
          ? servingToken.tokenNumber
          : null,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getQueueStatus };
