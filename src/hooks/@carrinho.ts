import { CriaEditaCarrinhoProps, EventoCarrinhoIngresso, PayloadCupomAplicado } from "../services/@carrinho";
import { EventosPayload, TaxasCheckout } from "../services/@eventos";

export type CarrinhoContextProps = {
   evento: EventoHook | null;
   adicionaEvento: (evento: EventosPayload) => void;
   adicionaIngressoAoEvento: (ingresso: EventoCarrinhoIngresso) => void;
   removeIngressoDoEvento: (eventoId: string, ingresso: EventoCarrinhoIngresso) => void;
   limpaCarrinho: () => void;
   total: number;
   totalItens: number;
   pedido?: CriaEditaCarrinhoProps;
   setCarrinhoId: (id: string) => void,
   carrinhoId: string;
   setCupom: (cupom: PayloadCupomAplicado) => void,
   cupom: PayloadCupomAplicado;
   totalComDesconto: number;
   taxa: number;
   valorFinal: number;
   setTaxa: (id: number) => void;
}

export type AdicionaIngressosAoEventoProps = {
   id: string;
   lote_id: string;
   qtd: number;
}

export type EventoHook = {
   bairro?: string;
   cidade?: string;
   data_evento?: string;
   nome?: string;
   nome_local?: string;
   logradouro?: string;
   numero?: string;
   id: string;
   estado?: string;
   taxas?: TaxasCheckout
   quantidade_parcelas?: number;
}

export type CarrinhoProviderProps = {
   children: React.ReactNode;
}