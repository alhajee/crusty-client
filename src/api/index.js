import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const insertGrocery = payload => api.post(`/grocery`, payload)
export const getAllGroceries = () => api.get(`/groceries`)
export const updateGroceryById = (id, payload) => api.put(`/grocery/${id}`, payload)
export const patchGroceryById = (id, payload) => api.patch(`/grocery/${id}`, payload)
export const deleteGroceryById = id => api.delete(`/grocery/${id}`)
export const getGroceryById = id => api.get(`/grocery/${id}`)

const apis = {
    insertGrocery,
    getAllGroceries,
    updateGroceryById,
    patchGroceryById,
    deleteGroceryById,
    getGroceryById,
}

export default apis