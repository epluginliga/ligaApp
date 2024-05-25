import { FormatData } from "./FormataData";
import { CartaoCredito } from "./cartaoCredito";

export function formataData(data: string) {
   return new FormatData(data);
}

export function cartaoCredito(numero: string) {
   return new CartaoCredito(numero);
}


