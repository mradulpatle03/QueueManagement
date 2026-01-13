const {generateTokenForService,getNextWaitingToken} = require("../services/token.service");

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

module.exports = {
    createToken,
    callNextToken,
};  