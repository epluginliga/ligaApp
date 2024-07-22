// Função para limpar e sanitizar a entrada do usuário, removendo espaços e caracteres especiais
function sanitizeInput(input: string) {
   return input.replace(/[^\d]/g, ''); // Mantém apenas os dígitos numéricos
}

// Função para validar um CPF
export function validateCPF(cpf: string) {
   // Sanitiza o CPF de entrada
   cpf = sanitizeInput(cpf);

   // Verifica se o CPF possui exatamente 11 dígitos após a sanitização
   if (cpf.length !== 11) {
      return false;
   }

   // Lista de CPFs inválidos conhecidos
   const invalidCPFs = [
      "00000000000", "11111111111", "22222222222", "33333333333", "44444444444",
      "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"
   ];

   // Verifica se o CPF está na lista de CPFs inválidos
   if (invalidCPFs.includes(cpf)) {
      return false;
   }

   // Função para calcular um dígito verificador
   function calculateDigit(sumFunction: Function) {
      let sum = sumFunction();
      let rev = 11 - (sum % 11);
      return (rev === 10 || rev === 11) ? 0 : rev;
   }

   // Função para calcular a soma dos dígitos multiplicados pelos pesos
   function calculateSum(multiplier: number) {
      let sum = 0;
      for (let i = 0; i < multiplier; i++) {
         sum += parseInt(cpf.charAt(i)) * (multiplier + 1 - i);
      }
      return sum;
   }

   try {
      // Calcula os dígitos verificadores
      const j = calculateDigit(() => calculateSum(9));
      const k = calculateDigit(() => calculateSum(10));

      // Verifica se os dígitos verificadores estão corretos
      if (j !== parseInt(cpf.charAt(9)) || k !== parseInt(cpf.charAt(10))) {
         return false;
      }
   } catch (error) {
      return false;
   }

   return true;
}
