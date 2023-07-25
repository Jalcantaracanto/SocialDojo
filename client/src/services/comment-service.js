import axios from 'axios'

export const addComment = (comment) => axios.post('http://localhost:8080/comment', comment)

export const getComments = (id) => axios.get(`http://localhost:8080/comments/${id}`)
