import api from ".";
import { vendaAplicativo } from "../utils/constantes";
import { PayloadDefault, PayloadPaginacaoResponse } from "./@index";

import {
   EventosPayload,
   IngressoDetalhePayload,
   IngressoDetalheProps,
   IngressoDisponivelProps,
   IngressosDisponivelPayloadProps,
   IngressosPayload, PayloadEventoAtletica
} from "./@eventos";

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

export async function fetchIngressoComprado(): PayloadPaginacaoResponse<IngressosPayload> {
   return await api
      .get(`/evento/ingresso/ingressos-comprados`)
      .then(success => success.data)
      .catch((err) => err);
}

export async function fetchIngressoDisponivel(
   { pontoVenda, evento_id }: IngressoDisponivelProps): PayloadDefault<IngressosDisponivelPayloadProps[]> {
   return await api
      .get(`/venda/ingressos/${pontoVenda}/${evento_id}`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}

export async function fetchEventoAtleticas(evento_id: string):
   PayloadDefault<PayloadEventoAtletica[]> {
   return await api
      .get(`/evento/acompanhar-evento/busca-atleticas/${evento_id}`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}

export async function fetchIngressoDetalhe({ bilhete_id }: IngressoDetalheProps):
   PayloadDefault<IngressoDetalhePayload> {
   return await api
      .get(`/venda/dados-pdf/${bilhete_id}`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}