import axios from 'axios';

export const url = "https://face-door-back.onrender.com"

export const api = axios.create({
    //baseURL: 'http://10.0.0.133:8081'
    //baseURL: 'https://face-door-back.onrender.com'
    baseURL: 'https://face-door-back.onrender.com'
});