import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";

import { vendaAplicativo } from "../utils/constantes";
import { EventosPayload } from "../services/@eventos";
import { CriaEditaCarrinhoProps, EventoCarrinhoIngresso } from "../services/@carrinho";

type CarrinhoContextProps = {
   evento: EventoHook | null;
   adicionaEvento: (evento: EventosPayload) => void;
   adicionaIngressoAoEvento: (ingresso: EventoCarrinhoIngresso) => void;
   removeIngressoDoEvento: (eventoId: string, ingresso: EventoCarrinhoIngresso) => void;
   total: number;
   totalItens: number;
   pedido?: CriaEditaCarrinhoProps;
}

export type AdicionaIngressosAoEventoProps = {
   id: string;
   lote_id: string;
   qtd: number;
}

type EventoHook = {
   bairro: string;
   cidade: string;
   data_evento: string;
   nome: string;
   nome_local: string;
   numero: string;
   id: string;
   estado: string;
}

const CarrinhoContext = createContext<CarrinhoContextProps>({} as CarrinhoContextProps);
export const carrinhoStorage = new MMKV();

type CarrinhoProviderProps = {
   children: React.ReactNode;
}
function CarrinhoProvider({ children }: CarrinhoProviderProps): React.ReactElement {
   const [evento, setEvento] = useState<EventoHook | null>(null);
   const [carrinho, setCarrinho] = useState<CriaEditaCarrinhoProps>({
      ponto_venda_id: vendaAplicativo,
      eventos: [{
         evento_id: "",
         ingressos: []
      }]
   });

   const adicionaEvento = useCallback((evento: EventosPayload) => {
      const storeEvento = {
         bairro: evento.bairro,
         cidade: evento.cidade,
         data_evento: evento.data_evento,
         nome: evento.nome,
         nome_local: evento.nome_local,
         numero: evento.numero,
         id: evento.id,
         estado: evento.estado,
      };

      setEvento(storeEvento);
      carrinhoStorage.set("@evento", JSON.stringify(storeEvento));

      setCarrinho((old) => ({
         ...old,
         eventos: [{
            evento_id: evento.id,
            ingressos: []
         }]
      }));

   }, []);

   const adicionaIngressoAoEvento = useCallback((ingresso: EventoCarrinhoIngresso) => {
      let copyPedido = { ...carrinho };
      let [eventos] = copyPedido.eventos;

      if (evento?.id) {
         eventos.evento_id = evento?.id;
      }

      let existeIngresso = eventos?.ingressos.find(item => item.id === ingresso.id);
      if (existeIngresso) {
         existeIngresso.qtd += 1;
      } else {
         eventos.ingressos.push(ingresso);
      }

      setCarrinho(copyPedido);
   }, [evento]);

   const removeIngressoDoEvento = useCallback((
      eventoId: string,
      ingresso: EventoCarrinhoIngresso,
   ) => {
      let copyPedido = { ...carrinho };

      let eventos = copyPedido.eventos.find(item => item.evento_id === eventoId);
      if (!eventos) {
         return;
      }

      let existeIngresso = eventos?.ingressos.find(item => item.id === ingresso.id);
      if (existeIngresso) {
         existeIngresso.qtd -= 1;
         if (existeIngresso.qtd < 0) {
            return;
         }
      }

      eventos.ingressos = copyPedido.eventos.flatMap(item => item.ingressos).filter(item => item.qtd !== 0);
      copyPedido.eventos.map(cppedido => {
         if (cppedido.evento_id === eventoId) {
            return eventos.ingressos
         }

         return cppedido;
      });

      setCarrinho(copyPedido);
   }, []);

   let total = carrinho.eventos
      .flatMap((evento) => evento.ingressos)
      .reduce((acumulador, ingresso) => acumulador + ingresso.qtd * (ingresso.valor || 0), 0);

   let totalItens = carrinho.eventos
      .flatMap(item => item.ingressos)
      .reduce((acumulador, ingresso) => acumulador + ingresso.qtd, 0);

   const obtemPedido = useCallback(() => {
      const store = carrinhoStorage.getString("@evento");
      if (store) {
         setEvento(JSON.parse(store));
      }
   }, []);

   useEffect(() => obtemPedido(), [obtemPedido]);

   return (
      <CarrinhoContext.Provider value={{
         evento,
         adicionaEvento,
         pedido: carrinho,
         adicionaIngressoAoEvento,
         removeIngressoDoEvento,
         total,
         totalItens
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
