import axios from 'axios';

export const url = "https://face-door-back.onrender.com"

export const api = axios.create({
    //baseURL: 'http://10.0.0.133:8081'
    baseURL: 'https://face-door-back.onrender.com'
    //baseURL: 'http://192.168.1.22:8081'
});