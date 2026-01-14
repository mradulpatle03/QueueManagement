import api from "./axios";

export const getQueue = (serviceId) =>
  api.get(`/queue/staff/${serviceId}`);

export const callNext = (data) =>
  api.post("/tokens/next", data);
