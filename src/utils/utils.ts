import { Data } from "./Data";
import { CartaoCredito } from "./CartaoCredito";
import { ImagemApp } from "./Imagem";

export function dataApp(data?: string) {
   return new Data(data);
}

export function cartaoCredito(numero: string) {
   return new CartaoCredito(numero);
}

export function imagemApp(path: string){
   return new ImagemApp(path);
}



