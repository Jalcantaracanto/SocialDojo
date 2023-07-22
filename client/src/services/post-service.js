import axios from 'axios'

export const getTimelinePosts = (id) => axios.get(`http://localhost:8080/post/${id}/timeline`)

export const likePost = (id, userId) => axios.put(`http://localhost:8080/post/${id}/like`, { userId: userId })
