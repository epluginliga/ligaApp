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
