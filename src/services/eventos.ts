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
   dia_semana: string;
   hora_evento: string;
   dia_evento: string;
   mes_evento: string;
   descricao: string;
}

export async function fetchEventos(): PayloadPaginacaoResponse<EventosPayload> {
   return await api
      .get('/evento?pontoVenda=baa1e135-5c35-44cf-9d6d-9e221dcdb004')
      .then(success => {
         console.log("status", success.status);
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}

export async function fetchEventoDetalhe(evento_id: string): Promise<EventosPayload> {
   return await api
      .get(`/evento/${evento_id}`)
      .then(success => success.data)
      .catch((err) => err);
}

export type IngressosPayload = {
   "bilhete_id": "f7e87999-d8e1-49fe-a0ce-9b6053beb3c6",
   "usuario_id": "38347b7f-81ab-40ba-bf90-0393c0fa861b",
   "codigo_barra": "5c9df60227",
   "cpf_compra": "75540355172",
   "bilhete_permite_transferencia": 1,
   "nome_compra": "Jean Marcos Vieira da Silva",
   "cpf_dono_original": "75540355172",
   "bilhete_valor_pago": "5",
   "bilhete_tipo_pagamento": "dinheiro",
   "vezes_utilizado": 0,
   "lote_nome": "TESTE 1234",
   "evento_nome": "Evento teste maquininha",
   "evento_path_imagem": "http://localhost/liga/public/assets\\img\\placeholder-evento.jpg",
   "evento_cidade": "Goiânia",
   "evento_estado": "GO",
   "evento_data_evento": "30/11/2023 18:00",
   "evento_data_encerramento": "2023-11-30 19:00:00",
   "evento_data_liberacao_ingresso": "19/11/2023 10:00",
   "evento_data_limite_transferencia": "2023-09-30 18:00:00",
   "ingresso_necessario_aprovacao_imagem": 0,
   "nome_ingresso": "Teste de ingresso",
   "ingresso_possui_restricao": 0,
   "ingresso_necessario_restricao": null,
   "ingresso_tipo_restricao": "sem_restricao",
   "ingresso_transferido": 0,
   "usuario_dono": boolean,
   "pode_transferir": boolean,
   "dia_semana": "qui",
   "hora_evento": "18",
   "dia_evento": "30",
   "mes_evento": "nov",
   "evento_data_evento_format_db": "2023-11-30 18:00:00",
   "evento_data_liberacao_ingresso_format_db": "2023-11-19 10:00:00",
   "evento_data_limite_transferencia_format_db": "2023-09-30 18:00:00",
   "data_encerramento": "2023-11-30 19:00:00",
   "cortesia": boolean
};

export async function fetchIngressoComprado(): PayloadPaginacaoResponse<IngressosPayload> {
   return await api
      .get(`/evento/ingresso/ingressos-comprados`)
      .then(success => success.data)
      .catch((err) => err);
}

