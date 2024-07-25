
export type PayloadCarrinho = {
   id: string;
   valor: number;
   status: "em_compra" | "aguardando_pagamento_pix";
   status_str: string;
   eventos: [
      {
         id: string;
         nome: string;
         slug: string;
         data_evento: string;
         abertura_portoes: string;
         path_imagem: string;
         nome_local: string;
         path_imagem_topo: string;
         path_imagem_rodape: string;
         visibilidade: string;
         data_liberacao_ingresso: string;
         data_limite_transferencia: string;
         info_ingresso_impresso: null,
         ingressos: IngressoCarrinho[]
         taxas: string;
      }
   ];
   usuario: {
      nome: string;
      username: string;
      email: string;
      cpf: string;
      sexo: string;
      data_nascimento: string;
   };
   dados_adquirencia: {
      adquirencia: string;
      dados_geracao_cartao: {
         adquirencia: string;
         public_key: string;
      }
   };
   parcelas_permitidas: number;
   quantidade_parcelas: number;
   data_expiracao: string;
   cupom?: PayloadCupomAplicado
};


export type IngressoCarrinho = {
   id: string;
   possui_restricao: boolean;
   restricao: string;
   tipo_restricao: "outro" | "cpf" | "email";
   lote_id: string;
   nome: string;
   classificacao_idade: "livre";
   sexo: string;
   valor: number;
   lote: string;
   necessario_aprovacao_imagem: number;
   qtd: number;
   sexo?: "masculino" | "feminino" | "naoinformar"
   taxa_conveniencia: number;
   dados_atribuir: {
      bilhete_id: string;
      nome?: string;
      cpf?: string;
      restricao?: string;
   }[];
   bilhetes_id: [];
   permitir_cupom: true
}


export type CriaEditaCarrinhoProps = {
   ponto_venda_id: string;
   eventos: EventoCarrinho[];
}

export type EventoCarrinho = {
   evento_id: string;
   ingressos: EventoCarrinhoIngresso[];
}

export type EventoCarrinhoIngresso = {
   id: string;
   lote_id: string;
   qtd: number;
   valor?: number;
}

export type PayloadCupomAplicado = {
   id: string;
   descricao: string;
   codigo: string;
   status: boolean,
   tipo_desconto: "percentual" | "fixo",
   valor: number,
}

// export enum  {

// }  "novo" |
//    "comprado" |
//    "cancelado" |
//    "em_compra" |
//    "aguardando_pagamento" |
//    "aguardando_pagamento_pix" |
//    "aguardando_pagamento_boleto" |
//    "aguardando_pagamento_cartao_credito"