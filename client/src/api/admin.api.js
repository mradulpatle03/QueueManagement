import api from "./axios";

export const getServices = () => api.get("/admin/services");
export const createService = (data) => api.post("/admin/services", data);

export const getCounters = () => api.get("/admin/counters");
export const createCounter = (data) => api.post("/admin/counters", data);
