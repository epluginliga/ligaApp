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
   number: number;
}

export type CheckoutProps = {
   tipo_pagamento: "cartao_credito" | "pix";
   parcelas: number;
   "pagarmetoken-0": string;
   number: string;
   cvc: string;
   name: string;
   expiry: string;
   dados_pagamento: {
      num_cartao: string;
      month: number;
      year: number;
      nome_cartao: string;
      cardtoken: string;
      cvc: string;
      brand: string;
   };

}
