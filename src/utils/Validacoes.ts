import { validateCPF } from "./validateCPF";

export class Validacoes {

   static CPF(cpf: string) {
      return validateCPF(cpf)
   }

}

