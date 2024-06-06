import axios from 'axios';
import { API_URL } from "@env";
console.log("API_UR   L", API_URL);

const api = axios.create({
   baseURL: API_URL,
   timeout: 5000,
   headers: {
      'Content-Type': 'application/json',
   },
});

export type PayloadPaginacao<T> = {
   current_page: number;
   data: Array<T>;
}

export type PayloadPaginacaoResponse<T> = Promise<PayloadPaginacao<T>>
export type PayloadDefault<T> = Promise<T>

export default api;
