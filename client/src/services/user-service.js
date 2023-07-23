import axios from 'axios'

export const getUser = (id) => axios.get(`http://localhost:8080/user/${id}`)

export const updateUser = (id, formData) => axios.put(`http://localhost:8080/user/${id}`, formData)

export const getAllUsers = () => axios.get('http://localhost:8080/users')

export const followUser = (id, data) => axios.put(`http://localhost:8080/user/${id}/follow`, data)

export const unfollowUser = (id, data) => axios.put(`http://localhost:8080/user/${id}/unfollow`, data)
