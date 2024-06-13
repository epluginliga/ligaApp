
export type PayloadCarrinho = {
   id: string;
   valor: number;
   status: "em_compra";
   status_str: string;
   eventos: EventoCarrinho[];
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
   data_expiracao: string;
};

export type EventoCarrinho = {
   id: string;
   nome: string;
   slug: string;
   data_evento: string;
   abertura_portoes: string;
   ingressos: IngressoCarrinho[];
   evento_id: string;
}

export type IngressoCarrinho = {
   id: string;
   possui_restricao: boolean;
   restricao: string;
   tipo_restricao: "outro" | "cpf" | "email";
   lote_id: string;
   nome: string;
   classificacao_idade: string;
   sexo: string;
   valor: number;
   lote: string;
   necessario_aprovacao_imagem: number;
   qtd: number;
   taxa_conveniencia: number;
   dados_atribuir: {
      bilhete_id: string;
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

