import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CodigoPagamento } from "../services/@checkout";
import { MMKV } from "react-native-mmkv";
import { format, isAfter, isBefore, parseISO, subHours, subMinutes } from "date-fns";

type StatusPix = "pendente" | "expirado" | "";
type CheckoutContextProps = {
   codigoPagamento: CodigoPagamento;
   setCondigoPagamento: (data: CodigoPagamento) => void;
   statusCodigoPix: StatusPix;
}
export type CheckoutProviderProps = {
   children: React.ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps);
export const checkoutStorage = new MMKV();

function CheckoutProvider({ children }: CheckoutProviderProps): React.ReactElement {
   const [codigoPagamento, setCodigoPagamento] = useState<CodigoPagamento>({} as CodigoPagamento);
   const [status, setStatus] = useState<StatusPix>("");

   const handleCondigoPagamento = useCallback((data: CodigoPagamento) => {
      setCodigoPagamento(data);
      checkoutStorage.set("@checkout", JSON.stringify(data));

      verificaValidadePix(data)
   }, [setCodigoPagamento]);

   const verificaValidadePix = useCallback((codigoPagamento: CodigoPagamento) => {
      const horaAtual = subMinutes(new Date(), new Date().getTimezoneOffset());
      const vencimento = new Date(codigoPagamento.vencimento);
      const codigoExpirou = vencimento.getTime() >= new Date(horaAtual).getTime() ? "pendente" : "expirado";

      console.log(codigoExpirou);
      
      if (codigoExpirou == "pendente") {
         setStatus(codigoExpirou);
         return;
      }

      limpaCodigoPagamento();

   }, []);

   const obtemTransacao = useCallback(() => {
      const store = checkoutStorage.getString("@checkout");
      if (store) {
         setCodigoPagamento(JSON.parse(store));
         verificaValidadePix(JSON.parse(store));
      }
   }, []);

   function limpaCodigoPagamento() {
      console.log("limpaCodigoPagamento")
      checkoutStorage.delete("@checkout");
      setCodigoPagamento({} as CodigoPagamento);
   };

   useEffect(() => {
      obtemTransacao();
   }, []);

   return <CheckoutContext.Provider
      value={{
         codigoPagamento,
         setCondigoPagamento: handleCondigoPagamento,
         statusCodigoPix: status
      }}
   >
      {children}
   </CheckoutContext.Provider>
}

function useCheckout(): CheckoutContextProps {
   const context = useContext(CheckoutContext);

   if (!context) {
      throw new Error('useCheckout must be used within an AuthProvider');
   }

   return context;
}

export { CheckoutProvider, useCheckout };