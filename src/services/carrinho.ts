import api from ".";
import { CriaEditaCarrinhoProps,PayloadCarrinho } from "./@carrinho";
import { PayloadDefault,PayloadDefaultError } from "./@index";

export async function criaEditaCarrinho(body: CriaEditaCarrinhoProps): PayloadDefault<PayloadDefaultError> {
   return await api
      .post(`/carrinho`,{ ...body })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}

export async function obtemCarrinho(): PayloadDefault<PayloadCarrinho> {
   return await api
      .get(`/carrinho`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
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
      .catch((err) => err);
}

export type AtribuiUtilizadorPayload = {
   lotes: {
      id: string;
      evento_ingresso_id: string;
      donos: {
         usuario_proprio?: boolean,
         restricao?: string;
         dono_ingresso: {
            nome?: string;
            cpf?: string
         }
      }[],
   }[]
}
export async function atribuiUtilizador(carrinho_id: string,body: AtribuiUtilizadorPayload): PayloadDefault<string> {
   return await api
      .post(`/carrinho/atribui-dono-ingresso/${carrinho_id}`,{ ...body })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}
