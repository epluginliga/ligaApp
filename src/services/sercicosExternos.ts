import axios from "axios";
import { PayloadDefault } from "./@index";
import { API_URL_CEP } from '@env';

export type PayloadObtemEnderecoCep = {
   cep: string;
   logradouro: string;
   numero: string;
   unidade: string;
   bairro: string;
   localidade: string;
   uf: string;
   ibge: string;
   gia: string;
   ddd: string;
   siafi: string;
}

const apiExterna = axios.create({
   timeout: 5000,
   headers: {
      'Content-Type': 'application/json',
   },
});

export async function ObtemEnderecoCep(cep: number): PayloadDefault<PayloadObtemEnderecoCep> {
   return await apiExterna
      .get(`${API_URL_CEP}/${cep}/json`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}