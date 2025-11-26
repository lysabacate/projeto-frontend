import api from "./api.js";

export const getResources = () => api.get("/mensagens");
export const getResource = (id) => api.get(`/mensagens/${id}`);
export const createResource = (data) => api.post("/mensagens", data);
export const updateResource = async (id, data) => (await api.put(`/mensagens/${id}`, data)).data;
export const deleteResource = (id) => api.delete(`/mensagens/${id}`);