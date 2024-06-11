export type EventosPayload = {
   id: string;
   nome: string;
   data_evento: string;
   path_imagem: string;
   logradouro: string;
   numero: string;
   bairro: string;
   complemento?: string,
   cidade: string;
   estado: string;
   nome_local: string;
   descricao: string;
   destaque: number;
}

export type IngressosPayload = {
   bilhete_id: string;
   evento_nome: string;
   evento_path_imagem: string;
   evento_cidade: string;
   evento_estado: string;
   evento_data_evento: string;
};


export type IngressosDisponivelIngressoPayloadProps = {
   id: string;
   nome: string;
   quantidade_por_usuario: number;
   valor: string;
   permitir_compra: number;
   lote_id: string;
   nome_lote: string;
   quantidade_por_compra: number,
   quantidade_disponivel_ingresso: number;
   quantidade_disponivel_lote: number;
   disponivel_data_ingresso: boolean;
   data_inicio_vendas: string;
   hora_inicio_vendas: string;
   dia_inicio_vendas_ingresso: string;
   mes_inicio_vendas_ingresso: string;
   ano_inicio_vendas_ingresso: string;
   data_fim_vendas: string;
   hora_fim_vendas: string;
   dia_fim_vendas_ingresso: string;
   mes_fim_vendas_ingresso: string;
   ano_fim_vendas_ingresso: string;
   taxa_conveniencia?: any,
   status_lote: string;
   mostrar_data_encerramento_lote: number;
   descricao?: string,
   nome_atletica?: string;
}

export type IngressosDisponivelPayloadProps = {
   setor_id: string;
   setor_nome: string;
   ingressos: IngressosDisponivelIngressoPayloadProps[]
}
export type IngressoDisponivelProps = {
   pontoVenda: string;
   evento_id: string;

}

export type PayloadEventoAtletica =  {
   id: string;
   nome: string;
   slug: string;
   curso?: string; 
};