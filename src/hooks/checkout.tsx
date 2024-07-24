import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CodigoPagamento } from "../services/@checkout";
import { MMKV } from "react-native-mmkv";
import { subMinutes } from "date-fns";

export type StatusPagamento = "pendente" | "expirado" | "concluido" | "";
type CheckoutContextProps = {
   codigoPagamento: CodigoPagamento;
   setCondigoPagamento: (data: CodigoPagamento) => void;
   statusPagamento: StatusPagamento;
   updateStatus: (status: StatusPagamento) => void
}
export type CheckoutProviderProps = {
   children: React.ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps);
export const checkoutStorage = new MMKV();

function CheckoutProvider({ children }: CheckoutProviderProps): React.ReactElement {
   const [codigoPagamento, setCodigoPagamento] = useState<CodigoPagamento>({} as CodigoPagamento);
   const [status, setStatus] = useState<StatusPagamento>("");

   const handleCondigoPagamento = useCallback((data: CodigoPagamento) => {
      setCodigoPagamento(data);
      checkoutStorage.set("@checkout", JSON.stringify(data));

      verificaValidadePix(data)
   }, [setCodigoPagamento]);

   const verificaValidadePix = useCallback((codigoPagamento: CodigoPagamento) => {
      const horaAtual = subMinutes(new Date(), new Date().getTimezoneOffset());
      const vencimento = new Date(codigoPagamento.vencimento);
      const codigoExpirou = vencimento.getTime() >= new Date(horaAtual).getTime() ? "pendente" : "expirado";

      if (codigoExpirou == "pendente") {
         setStatus(codigoExpirou);
         return;
      }

      limpaCodigoPagamento();
   }, []);

   const handleMarcarStatus = useCallback((status: StatusPagamento) => {
      setStatus(status)
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
         statusPagamento: status,
         updateStatus: handleMarcarStatus
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