import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";

import { vendaAplicativo } from "../utils/constantes";
import { EventosPayload } from "../services/@eventos";
import { CriaEditaCarrinhoProps, EventoCarrinhoIngresso, PayloadCupomAplicado } from "../services/@carrinho";
import { CarrinhoContextProps, CarrinhoProviderProps, EventoHook } from "./@carrinho";

const CarrinhoContext = createContext<CarrinhoContextProps>({} as CarrinhoContextProps);
export const carrinhoStorage = new MMKV();

function CarrinhoProvider({ children }: CarrinhoProviderProps): React.ReactElement {
   const [evento, setEvento] = useState<EventoHook | null>(null);
   const [carrinhoId, setCarrinhoId] = useState('');
   const [cupom, setCupom] = useState<PayloadCupomAplicado>({} as PayloadCupomAplicado);
   const [taxa, setTaxa] = useState(0);

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
         taxas: JSON.parse(evento?.taxas || ''),
         logradouro: evento.logradouro,
         quantidade_parcelas: evento.quantidade_parcelas,

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

   const updateCarrinhoID = useCallback((id: string) => setCarrinhoId(id), [])

   const adicionaIngressoAoEvento = useCallback((ingresso: EventoCarrinhoIngresso) => {
      let copyPedido = Object.assign({}, carrinho);
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
      carrinhoStorage.set("@carrinho", JSON.stringify(copyPedido));
   }, [evento, carrinho]);

   const removeIngressoDoEvento = useCallback((
      eventoId: string,
      ingresso: EventoCarrinhoIngresso,
   ) => {
      let copyPedido = Object.assign({}, carrinho);
      let [eventos] = copyPedido.eventos;


      let existeIngresso = eventos?.ingressos.find(item => item.id === ingresso.id);
      if (existeIngresso) {
         existeIngresso.qtd -= 1;
      }

      eventos.ingressos = copyPedido.eventos.flatMap(item => item.ingressos).filter(item => item.qtd !== 0);
      copyPedido.eventos.map(cppedido => {
         if (cppedido.evento_id === eventoId) {
            return eventos.ingressos
         }

         return cppedido;
      });

      setCarrinho(copyPedido);
      carrinhoStorage.set("@carrinho", JSON.stringify(copyPedido));
   }, [carrinho]);

   const limpaCarrinho = useCallback(() => {
      setCarrinho({
         ponto_venda_id: vendaAplicativo,
         eventos: [{
            evento_id: "",
            ingressos: []
         }]
      });
      setEvento(null);
      setCarrinhoId('');
      setCupom({} as PayloadCupomAplicado);

      carrinhoStorage.delete("@carrinho");
      carrinhoStorage.delete("@evento");
   }, []);

   const obtemPedido = useCallback(() => {
      const store = carrinhoStorage.getString("@evento");
      if (store) {
         setEvento(JSON.parse(store));
      }

      const carrinhoStore = carrinhoStorage.getString("@carrinho");
      if (carrinhoStore) {
         setCarrinho(JSON.parse(carrinhoStore));
      }
   }, []);

   let total = carrinho.eventos
      .flatMap((evento) => evento.ingressos)
      .reduce((acumulador, ingresso) => acumulador + ingresso.qtd * (ingresso.valor || 0), 0);

   let totalItens = carrinho.eventos
      .flatMap(item => item.ingressos)
      .reduce((acumulador, ingresso) => acumulador + ingresso.qtd, 0);

   let totalComDesconto = total - (cupom.valor || 0);
   if (cupom.tipo_desconto === "percentual") {
      totalComDesconto = total - (total * (cupom.valor / 100));
   }
   const valorFinal = totalComDesconto + taxa;

   useEffect(() => obtemPedido(), [obtemPedido]);

   return (
      <CarrinhoContext.Provider value={{
         evento,
         adicionaEvento,
         pedido: carrinho,
         adicionaIngressoAoEvento,
         removeIngressoDoEvento,
         limpaCarrinho,
         total,
         totalItens,
         setCarrinhoId: updateCarrinhoID,
         carrinhoId,
         setCupom,
         cupom,
         totalComDesconto,
         setTaxa,
         taxa,
         valorFinal
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
