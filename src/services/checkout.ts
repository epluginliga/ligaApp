import { URL_TOKEN_CARTAO } from '@env';
import { PayloadDefault } from "./@index";
import api from ".";
import { CheckoutPayload, CheckoutProps, TokenCartaoPayload, TokenCartaoProps } from './@checkout';
import { ADQUIRENCIA } from "@env";


export async function tokenCartao(
   card: TokenCartaoProps,
   appId = ADQUIRENCIA): PayloadDefault<TokenCartaoPayload> {
   const oldUrl = api.defaults.baseURL;
   api.defaults.baseURL = URL_TOKEN_CARTAO;

   return await api
      .post(`/tokens?appId=${appId}&type=checkout-transparent-multi-card`, { card })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      }).finally(() => {
         api.defaults.baseURL = oldUrl;
      });
}


export async function checkout(body: CheckoutProps, carrinho_id: string): PayloadDefault<CheckoutPayload> {

   return await api
      .post(`/carrinho/checkout/${carrinho_id}`, body)
      .then(success => {
         if (success.status !== 200) {
            throw Error("Erro interno!")
         }
         return success.data;
      }).catch(err => err);
}
