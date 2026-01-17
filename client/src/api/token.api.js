const api = require("./axios");

const callNextToken = async (serviceId, counterId) => {
  const res = await api.post("/tokens/call-next", {
    serviceId,
    counterId,
  });
  return res.data;
};

const completeToken = async (tokenId) => {
  const res = await api.post("/tokens/complete", {
    tokenId,
  });
  return res.data;
};

module.exports = {
  callNextToken,
  completeToken,
};