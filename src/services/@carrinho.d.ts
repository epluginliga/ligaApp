
export type PayloadCarrinho = {
   id: string;
   valor: number;
   status: string;
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
}

export type IngressoCarrinho = {
   id: string;
   possui_restricao: 1;
   restricao: string;
   tipo_restricao: "outro" | "cpf" | "email";
   lote_id: string;
   nome: string;
   classificacao_idade: string;
   sexo: string;
   valor: string;
   lote: string;
   necessario_aprovacao_imagem: 1;
   qtd: 1;
   taxa_conveniencia: 0;
   dados_atribuir: {
      bilhete_id: string;
   }[];
   bilhetes_id: [];
   permitir_cupom: true
}
