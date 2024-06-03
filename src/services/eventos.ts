import api, { PayloadPaginacaoResponse } from ".";

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

const vendaAplicativo = '62ba7aa0-07dc-435d-8961-f4ff309b8bd0';

export async function fetchEventos(): PayloadPaginacaoResponse<EventosPayload> {
   return await api
      .get(`/app/evento?pontoVenda=${vendaAplicativo}`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}

export async function fetchEventoDetalhe(evento_id: string): Promise<EventosPayload> {
   return await api
      .get(`/app/evento/${evento_id}`)
      .then(success => success.data)
      .catch((err) => err);
}

export type IngressosPayload = {
   bilhete_id: string;
   usuario_id: string;
   codigo_barra: string;
   cpf_compra: string;
   bilhete_permite_transferencia: number;
   nome_compra: string;
   cpf_dono_original: string;
   bilhete_valor_pago: string;
   bilhete_tipo_pagamento: string;
   vezes_utilizado: number;
   lote_nome: string;
   evento_nome: string;
   evento_path_imagem: string;
   evento_cidade: string;
   evento_estado: string;
   evento_data_evento: string;
   evento_data_encerramento: string;
   evento_data_liberacao_ingresso: string;
   evento_data_limite_transferencia: string;
   ingresso_necessario_aprovacao_imagem: number;
   nome_ingresso: string;
   ingresso_possui_restricao: number;
   ingresso_necessario_restricao: null,
   ingresso_tipo_restricao: string;
   ingresso_transferido: number;
   usuario_dono: boolean,
   pode_transferir: boolean,
   dia_semana: string;
   hora_evento: string;
   dia_evento: string;
   mes_evento: string;
   evento_data_evento_format_db: string;
   evento_data_liberacao_ingresso_format_db: string;
   evento_data_limite_transferencia_format_db: string;
   data_encerramento: string;
   cortesia: boolean
};

export async function fetchIngressoComprado(): PayloadPaginacaoResponse<IngressosPayload> {
   return await api
      .get(`/evento/ingresso/ingressos-comprados`)
      .then(success => success.data)
      .catch((err) => err);
}

