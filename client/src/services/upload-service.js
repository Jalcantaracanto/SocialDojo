import axios from 'axios'

export const uploadImage = (data) => axios.post('http://localhost:8080/upload', data)

export const uploadPost = (data) => axios.post('http://localhost:8080/post', data)
