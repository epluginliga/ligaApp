import React, { createContext, useCallback, useContext, useState } from "react";
import { MMKV } from "react-native-mmkv";
import { EventosPayload } from "../services/eventos";
import { CriaEditaCarrinhoProps, EventoCarrinho } from "../services/carrinho";

type CarrinhoContextProps = {
   evento: EventosPayload | null;
   handleAddEvento: (evento: EventosPayload) => void;
   handleRemoveEvento: () => void;
   compra?: CriaEditaCarrinhoProps;
   handleAddCarrinho: (ingresso: EventoCarrinho) => void;
}

type CarrinhoProviderProps = {
   children: React.ReactNode;
}

const CarrinhoContext = createContext<CarrinhoContextProps>({} as CarrinhoContextProps);
export const usuarioStorage = new MMKV();

function CarrinhoProvider({ children }: CarrinhoProviderProps): React.ReactElement {
   const [evento, setEvento] = useState<EventosPayload | null>(null);
   const [ingressoEvento, setIngressoEvento] = useState<EventoCarrinho[]>([]);

   const handleAddEvento = useCallback((evento: EventosPayload) => {
      setEvento(evento);
   }, []);

   const handleRemoveEvento = useCallback(() => {
      setEvento(null);
   }, []);

   const handleAddCarrinho = useCallback((ingresso: EventoCarrinho) => {
      setIngressoEvento(state => [...state, ingresso])
   }, []);

   return (
      <CarrinhoContext.Provider value={{
         evento,
         handleAddEvento,
         handleRemoveEvento,
         handleAddCarrinho
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
