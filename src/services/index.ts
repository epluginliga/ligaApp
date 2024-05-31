import axios from 'axios';
import { API_URL } from "@env";

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

export default api;
