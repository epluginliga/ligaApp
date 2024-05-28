import axios from 'axios';
import { API_URL } from "@env";

console.log("dede", 'http://192.168.1.221/liga/public/api');

const api = axios.create({
   baseURL: 'http://192.168.1.221/liga/public/api',
   timeout: 5000,
   headers: {
      'Content-Type': 'application/json',
   },
});

export default api;
