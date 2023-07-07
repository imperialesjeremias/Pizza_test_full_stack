import axios from 'axios';

export const loginJWT = async (user) => await axios.post('http://localhost:3000/api/auth/login', user)
export const basiclogin = async (user) => await axios.post('http://localhost:3000/api/auth/basic-login', user)