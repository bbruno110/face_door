import axios from 'axios';

export const url = "http://192.168.1.22:8081"

export const api = axios.create({
    //baseURL: 'http://10.0.0.133:8081'
    //baseURL: 'https://face-door-back.onrender.com'
    baseURL: url
});