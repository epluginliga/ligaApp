import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";
import { addMinutes, subMinutes } from "date-fns";
import { TEMPO_PIX } from "@env";

export type StatusPagamento = "pendente" | "expirado" | "concluido" | "aguardando_pagamento_pix" | "";

type CodigoPagamentoStored = {
   codigo: string;
   vencimento: string;
}

type CheckoutContextProps = {
   codigoPagamento: string;
   setCondigoPagamento: (data: string) => void;
   statusPagamento: StatusPagamento;
   updateStatus: (status: StatusPagamento) => void
}
export type CheckoutProviderProps = {
   children: React.ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps);
export const checkoutStorage = new MMKV();

function CheckoutProvider({ children }: CheckoutProviderProps): React.ReactElement {
   const [codigoPagamento, setCodigoPagamento] = useState<string>("");
   const [status, setStatus] = useState<StatusPagamento>("");

   const verificaValidadePix = useCallback((stored: CodigoPagamentoStored) => {
      const horaAtual = subMinutes(new Date(), new Date().getTimezoneOffset());
      const vencimento = new Date(stored.vencimento);
      const codigoExpirou = vencimento.getTime() >= new Date(horaAtual).getTime() ? "pendente" : "expirado";

      if (codigoExpirou == "pendente") {
         setStatus(codigoExpirou);
         return;
      }

      limpaCodigoPagamento();
   }, []);

   const handleCondigoPagamento = useCallback((data: string) => {
      const stored: CodigoPagamentoStored = {
         codigo: data,
         vencimento: addMinutes(new Date(), Number(TEMPO_PIX)).toISOString(),
      };
      setCodigoPagamento(data);
      checkoutStorage.set("@checkout", JSON.stringify(stored));

      verificaValidadePix(stored);
   }, [setCodigoPagamento]);

   const handleMarcarStatus = useCallback((status: StatusPagamento) => {
      setStatus(status)
   }, []);

   const obtemTransacao = useCallback(() => {
      const store = checkoutStorage.getString("@checkout");
      if (!store) return;

      try {
         const stored: CodigoPagamentoStored = JSON.parse(store);
         if (!stored?.codigo || !stored?.vencimento) {
            limpaCodigoPagamento();
            return;
         }
         setCodigoPagamento(stored.codigo);
         verificaValidadePix(stored);
      } catch {
         limpaCodigoPagamento();
      }
   }, []);

   function limpaCodigoPagamento() {
      checkoutStorage.delete("@checkout");
      setCodigoPagamento("");
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
