import axios from "axios";
import api from ".";
import { CriaEditaCarrinhoProps, PayloadCarrinho } from "./@carrinho";
import { PayloadDefault, PayloadDefaultResponse } from "./@index";
import { API_URL } from "@env";

export async function criaEditaCarrinho(body: CriaEditaCarrinhoProps): PayloadDefault<PayloadDefaultResponse> {
   return await api
      .post(`/carrinho`, { ...body })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
}

export async function obtemCarrinho(): PayloadDefault<PayloadCarrinho> {
   return await api
      .get(`/carrinho`)
      .then(success => {
         if (!success.data) {
            return success;
         }

         return success.data;
      })
}

export async function deletaCarrinho(carrinho_id: string): PayloadDefault<string> {
   return await api
      .delete(`/carrinho/${carrinho_id}`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
}


export async function atribuiUtilizador(carrinho_id: string, body: object): PayloadDefault<string> {
   return await api
      .post(`/carrinho/atribui-dono-ingresso/${carrinho_id}`, { ...body })
      .then(success => {
         if (success.data) {
            return success.data;
         }

         throw new Error("Erro");

      });
}


export async function aplicaCupomDesconto(carrinho: string, codigo: string): PayloadDefault<string> {
   return await api
      .post(`/carrinho/cupom/aplicar`, { carrinho, codigo })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}


export async function removeCupomDesconto(carrinho: string): PayloadDefault<string> {
   return await api
      .delete(`/carrinho/cupom/remover/${carrinho}`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}

export type CarrinhoStatusPagamentoPayload = {
   carrinho: {
      status: "novo"
      | "comprado"
      | "aguardando_pagamento_pix"
      | "aguardando_pagamento"
      | "cancelado"
      | "em_compra"
      | "aguardando_pagamento_boleto"
      | "aguardando_pagamento_cartao_credito",
      status_str: string;
   }
}
export async function carrinhoStatusPagamento(carrinho_id: string, token: string): PayloadDefault<CarrinhoStatusPagamentoPayload> {
   return await axios
      .get(`${API_URL}/carrinho/statuspagamento/${carrinho_id}`, {
         headers: {
            Authorization: token
         }
      })
      .then(success => {
         return success.data;
      })
      .catch(() => {
         return false
      });
}
