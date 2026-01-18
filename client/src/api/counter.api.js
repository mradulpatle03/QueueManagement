import api from "./axios";

export const getCountersByService = async (serviceId) => {
  const res = await api.get(`/counters/service/${serviceId}`);
  return res.data.data;
};
