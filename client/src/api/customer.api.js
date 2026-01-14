import api from "./axios";

export const takeToken = (data) =>
  api.post("/tokens", data);

export const getStatus = (tokenId) =>
  api.get(`/queue/customer/${tokenId}`);
