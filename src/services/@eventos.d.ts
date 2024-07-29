export type EventosPayload = {
   id: string;
   nome: string;
   data_evento: string;
   path_imagem: string;
   logradouro?: string;
   numero?: string;
   bairro?: string;
   complemento?: string,
   cidade?: string;
   estado?: string;
   nome_local: string;
   descricao?: string;
   destaque?: number;
   taxas?: string;
   quantidade_parcelas: number;
   url_visualizacao?: string;
}


export type TaxasCheckout = {
   taxaplataforma: number;
   taxafixa: number;
   taxaplataforma_pix: number;
   taxafixa_pix: number;
   taxaplataforma_boleto: number;
   taxafixa_boleto: number;
   dias_adiantamento: number;
   dias_preautorizacao: number;
   taxasparcelamento: number[];
   taxaconveniencia: number;
   taxaconveniencia_pix: number;
   taxaconveniencia_boleto: number;
}

export type IngressosPayload = {
   bilhete_id: string;
   evento_nome: string;
   evento_path_imagem: string;
   evento_cidade: string;
   evento_estado: string;
   evento_data_evento: string;
   evento_data_evento_format_db: string;
   ingresso_transferido: boolean;
   ingresso_necessario_aprovacao_imagem: number;
   bilhete_permite_transferencia: number;
   pode_transferir: boolean;
   usuario_dono: boolean;
   vezes_utilizado: number;
   evento_data_limite_transferencia: string;
   cpf_dono_original: string;
   cpf_compra: string;
   nome_compra: string;
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

export type PayloadEventoAtletica = {
   id: string;
   nome: string;
   slug: string;
   curso?: string;
};

export type IngressoDetalheProps = {
   bilhete_id: string;
}

export type IngressoDetalhePayload = {
   dadosCompra: {
      evento_id: string;
      evento_nome: string;
      evento_cidade: string;
      evento_estado: string;
      evento_data_evento: string;
      evento_abertura_portoes: string;
      evento_path_imagem: string;
      evento_nome_local: string;
      evento_path_imagem_topo?: string;
      evento_path_imagem_rodape?: string;
      evento_data_liberacao_ingresso: string;
      evento_info_ingresso_impresso?: string,
      ingresso_nome: string;
      ingresso_descricao?: string;
      bilhete_codigo_barra: string;
      bilhete_status: string;
      bilhete_valor_pago: number;
      bilhete_valor_original: number;
      bilhete_tipo_pagamento: string;
      bilhete_nome_compra: string;
      bilhete_cpf_compra: string;
      bilhete_restricao_compra?: string;
      ingresso_necessario_aprovacao_imagem: number;
      usuario_path_avatar: string;
      usuario_path_avatar_aprovado: string;
      dia_semana: string;
      hora_evento: string;
      dia_evento: string;
      mes_evento: string;
   },
   dadosUsuario: {
      id: string;
      name: string;
      username: string;
      email: string;
      email_verified_at?: string;
      path_avatar: string;
      sexo: "masculino" | "feminino",
      deleted_at?: string;
      created_at: string;
      updated_at: string;
      data_nascimento: string;
      status_aprovacao: "aprovado",
      path_avatar_aprovado: string;
      primeiro_acesso: number;
      apelido?: string;
      path_cracha?: string;
      alojamento: number;
      tamanho_camiseta?: string;
      endereco_cep: string;
      endereco_logradouro: string;
      endereco_numero: string;
      endereco_bairro: string;
      endereco_complemento: string;
      endereco_cidade: string;
      endereco_estado: string;
      endereco_padrao: boolean,
      endereco_latitude: string;
      endereco_longitude: string;
      documento_tipo: string;
      documento_numero: string;
      telefone_ddd: string;
      telefone_numero: string;
   }
}