import React, { createContext, useCallback, useContext, useState } from "react";
import { MMKV } from "react-native-mmkv";
import { EventosPayload } from "../services/eventos";

type CarrinhoContextProps = {
   evento: EventosPayload | null;
   handleAddEvento: (evento: EventosPayload) => void;
   handleRemoveEvento: () => void;
}

type CarrinhoProviderProps = {
   children: React.ReactNode;
}


const CarrinhoContext = createContext<CarrinhoContextProps>({} as CarrinhoContextProps);
export const usuarioStorage = new MMKV();

function CarrinhoProvider({ children }: CarrinhoProviderProps): React.ReactElement {
   const [evento, setEvento] = useState<EventosPayload | null>(null);

   const handleAddEvento = useCallback((evento: EventosPayload) => {
      setEvento(evento);
   }, []);

   const handleRemoveEvento = useCallback(() => {
      setEvento(null);
   }, []);

   return (
      <CarrinhoContext.Provider value={{
         evento,
         handleAddEvento,
         handleRemoveEvento
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
