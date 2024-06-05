import React, { createContext, useCallback, useContext, useState } from "react";
import { MMKV } from "react-native-mmkv";

import { EventosPayload } from "../services/eventos";
import { CriaEditaCarrinhoProps, EventoCarrinhoIngresso } from "../services/carrinho";
import { vendaAplicativo } from "../utils/constantes";

type CarrinhoContextProps = {
   evento: EventosPayload | null;
   adicionaEvento: (evento: EventosPayload) => void;
   adicionaIngressoAoEvento: (eventoId: string, ingresso: EventoCarrinhoIngresso) => void;
   removeIngressoDoEvento: () => void;
   total: number;
   pedido?: CriaEditaCarrinhoProps;
}

type CarrinhoProviderProps = {
   children: React.ReactNode;
}

export type AdicionaIngressosAoEventoProps = {
   id: string;
   lote_id: string;
   qtd: number;
}

const CarrinhoContext = createContext<CarrinhoContextProps>({} as CarrinhoContextProps);
export const usuarioStorage = new MMKV();

function CarrinhoProvider({ children }: CarrinhoProviderProps): React.ReactElement {
   const [evento, setEvento] = useState<EventosPayload | null>(null);
   const [pedido, setPedido] = useState<CriaEditaCarrinhoProps>({
      ponto_venda_id: vendaAplicativo,
      eventos: []
   });

   let total = pedido.eventos
      .flatMap((evento) => evento.ingressos)
      .reduce((acumulador, ingresso) => acumulador + ingresso.qtd * (ingresso.valor || 0), 0);

   function adicionaEventoAoPedido(eventoId: string) {
      const existe = pedido.eventos.find(evento => evento.evento_id === eventoId);
      if (!existe) {
         pedido.eventos.push({ evento_id: eventoId, ingressos: [] });
      }
      setPedido(pedido);
   }

   const removeIngressoDoEvento = useCallback(() => { }, []);

   const adicionaIngressoAoEvento = useCallback((
      eventoId: string,
      ingresso: EventoCarrinhoIngresso,
   ) => {
      let copyPedido = { ...pedido };

      let eventos = copyPedido.eventos.find(item => item.evento_id === eventoId);
      if (!eventos) {
         return;
      }

      let existeIngresso = eventos?.ingressos.find(item => item.id === ingresso.id);
      if (existeIngresso) {
         existeIngresso.qtd += 1;
      } else {
         eventos?.ingressos.push(ingresso);
         copyPedido.eventos = [eventos];
      }

      setPedido(copyPedido);

   }, []);

   const adicionaEvento = useCallback((evento: EventosPayload) => {
      setEvento(evento);
      adicionaEventoAoPedido(evento.id)
   }, []);


   return (
      <CarrinhoContext.Provider value={{
         evento,
         adicionaEvento,
         pedido,
         adicionaIngressoAoEvento,
         removeIngressoDoEvento,
         total
      }}>
         {children}
      </CarrinhoContext.Provider>
   )
}

function useCarrinho(): CarrinhoContextProps {
   const context = useContext(CarrinhoContext);

   if (!context) {
      throw new Error('useCarrinho must be used within an AuthProvider');
   }

   return context;
}

export { CarrinhoProvider, useCarrinho };
