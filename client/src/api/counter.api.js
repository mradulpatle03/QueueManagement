const api = require("./axios");

const getCountersByService = async (serviceId) => {
  const res = await api.get(`/counters/service/${serviceId}`);
  return res.data;
};

module.exports = {
  getCountersByService,
};