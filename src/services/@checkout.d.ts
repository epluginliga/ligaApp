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

export type CheckoutProps = {
   tipo_pagamento: "cartao_credito" | "pix";
   parcelas?: number;
   "pagarmetoken-0"?: string;
   number?: string;
   cvc?: string;
   name?: string;
   expiry?: string;
   dados_pagamento?: {
      num_cartao: string;
      month: number;
      year: number;
      nome_cartao: string;
      cardtoken: string;
      cvc: string;
      brand: string;
   };
}

export type CheckoutPayload = {
   status: "falha" | "pendente",
   mensagens: [],
   mensagem_adquirencia: {
      codigo: string;
      mensagem: string;
      mensagemSolucao: string;
   }
   codigo_pagamento: {
      tipo_pagamento: string;
      cobranca_id: string;
      codigo: string;
      nosso_numero: null,
      url_view: string;
      url_pdf_view: null,
      url_view_codigo_barra: null,
      vencimento: string;
      id: string;
      updated_at: string;
      created_at: string;
   },
   mensagens: [],
}

