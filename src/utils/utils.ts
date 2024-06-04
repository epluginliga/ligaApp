import { FormatData } from "./FormataData";
import { CartaoCredito } from "./CartaoCredito";

export function formataData(data?: string) {
   return new FormatData(data);
}

export function cartaoCredito(numero: string) {
   return new CartaoCredito(numero);
}


