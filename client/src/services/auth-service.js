import axios from 'axios'

export const logIn = (data) => axios.post('http://localhost:8080/user/login', data)
export const signUp = (data) => axios.post('http://localhost:8080/user/register', data)
