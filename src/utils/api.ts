import axios from 'axios';

export const api = axios.create({
    //baseURL: 'http://10.0.0.133:8081'
    baseURL: 'https://face-door-back.onrender.com'
});