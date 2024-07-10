import { URL_TOKEN_CARTAO } from '@env';
import { PayloadDefault } from "./@index";
import api from ".";

export type TokenCartaoPayload = {
   id: string;
   type: string;
   created_at: string;
   expires_at: string;
   card: {
      first_six_digits: string;
      last_four_digits: string;
      holder_name: string;
      exp_month: number;
      exp_year: number;
      brand: string;
   }
}

export type TokenCartaoProps = {
   index: number;
   type: "credit_card",
   holder_name: string;
   cvv: string;
   exp_month: string;
   exp_year: string;
   number: string;
}

export async function tokenCartao(
   card: TokenCartaoProps,
   appId = 'pk_test_9PABOKs1KhR9BZo6'): PayloadDefault<TokenCartaoPayload> {

   api.defaults.baseURL = URL_TOKEN_CARTAO;

   return await api
      .post(`/tokens?appId=${appId}&type=checkout-transparent-multi-card`, { card })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}
