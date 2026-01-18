import api from "./axios";

export const getServices = async () =>{
    const res =await api.get("/admin/services");
    console.log(res.data.data);
    return res.data.data;
} 
export const createService = (data) => api.post("/admin/services", data);

export const getCounters = () => api.get("/admin/counters");

export const createCounter = async (payload) => {
  const res = await api.post("/admin/counters", payload);
  return res.data.data;
};

export const createStaff = async (payload) => {
  const res = await api.post("/admin/staff", payload);
  return res.data.data;
};