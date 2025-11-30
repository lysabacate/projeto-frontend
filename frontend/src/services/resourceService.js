import api from "./api.js";

export const getResources = (params) => api.get(`/resources`, { params });
export const getResource = (id) => api.get(`/resources/${id}`);
export const createResource = (data) => api.post(`/resources`, data);
export const updateResource = async (id, data) => (await api.put(`/resources/${id}`, data)).data;
export const deleteResource = (id) => api.delete(`/resources/${id}`);