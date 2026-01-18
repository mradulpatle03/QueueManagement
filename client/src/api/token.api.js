import api from "./axios";

export const callNextToken = async (counterId) => {
  const res = await api.post("/queue/next", {
    counterId,
  });
  return res.data;
};

export const completeToken = async (tokenId) => {
  const res = await api.patch(`/tokens/${tokenId}/complete`);
  return res.data;
};
