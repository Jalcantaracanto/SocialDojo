import axios from 'axios'

export const getUser = (id) => axios.get(`http://localhost:8080/user/${id}`)

export const updateUser = (id, formData) => axios.put(`http://localhost:8080/user/${id}`, formData)

