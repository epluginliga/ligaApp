export class Validacoes {


   static validarCPF(cpf: string) {
      const cpfLimpo = cpf.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
         return false;
      }

      if (/^(\d)\1+$/.test(cpfLimpo)) {
         return false;
      }

      let soma = 0;
      for (let i = 0; i < 9; i++) {
         soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
      }
      const primeiroDigito = (soma * 10) % 11;

      if (primeiroDigito !== parseInt(cpfLimpo.charAt(9))) {
         return false;
      }

      soma = 0;
      for (let i = 0; i < 10; i++) {
         soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
      }
      const segundoDigito = (soma * 10) % 11;

      return segundoDigito === parseInt(cpfLimpo.charAt(10));
   }
}

