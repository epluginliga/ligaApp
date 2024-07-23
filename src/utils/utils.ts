import { Data } from "./Data";
import { CartaoCredito } from "./CartaoCredito";

export function dataApp(data?: string) {
   return new Data(data);
}

export function cartaoCredito(numero: string) {
   return new CartaoCredito(numero);
}



