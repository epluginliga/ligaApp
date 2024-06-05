import api, { PayloadDefault } from ".";

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

type PayloadCriaEditaCarrinho = {
   "codigoretorno": number,
   "erro": boolean;
   "id": string;
   "mensagem": string;
   "mensagenserro": []
}

export async function criaEditaCarrinho(body: CriaEditaCarrinhoProps): PayloadDefault<PayloadCriaEditaCarrinho> {
   return await api
      .post(`/carrinho`, { ...body })
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
      .catch((err) => err);
}
