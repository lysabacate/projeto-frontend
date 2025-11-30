import api from './api.js'

export const getSubresources = (resourceId) => api.get('/subresources', { params: { resourceId } })
export const createSubresource = (data) => api.post('/subresources', data)
export const updateSubresource = (id, data) => api.put(`/subresources/${id}`, data)
export const deleteSubresource = (id) => api.delete(`/subresources/${id}`)

export default { getSubresources, createSubresource, updateSubresource, deleteSubresource }
