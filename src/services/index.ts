import axios from 'axios';
import { API_URL } from "@env";
console.log("API_URL", API_URL);

const api = axios.create({
   baseURL: API_URL,
   timeout: 5000,
   headers: {
      'Content-Type': 'application/json',
   },
});


export default api;
