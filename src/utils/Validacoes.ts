import { validateCPF } from './validateCPF';

export class Validacoes {
   static CPF(cpf: string) {
      return validateCPF(cpf);
   }

   static telefone(telefone: string): boolean {
      const digits = telefone.replace(/\D/g, '');

      if (digits.length < 10 || digits.length > 11) return false;
      
      // Verifica se todos os dígitos são iguais
      // Remove o DDD antes de verificar se todos os dígitos são iguais
      const numeroSemDDD = digits.length === 11 ? digits.substring(2) : digits.substring(2);
      if (/^(\d)\1+$/.test(numeroSemDDD)) return false;

      const ddd = digits.substring(0, 2);

      const dddsValidos = [
         '11',
         '12',
         '13',
         '14',
         '15',
         '16',
         '17',
         '18',
         '19',
         '21',
         '22',
         '24',
         '27',
         '28',
         '31',
         '32',
         '33',
         '34',
         '35',
         '37',
         '38',
         '41',
         '42',
         '43',
         '44',
         '45',
         '46',
         '47',
         '48',
         '49',
         '51',
         '53',
         '54',
         '55',
         '61',
         '62',
         '64',
         '63',
         '65',
         '66',
         '67',
         '68',
         '69',
         '71',
         '73',
         '74',
         '75',
         '77',
         '79',
         '81',
         '82',
         '83',
         '84',
         '85',
         '86',
         '87',
         '88',
         '89',
         '91',
         '92',
         '93',
         '94',
         '95',
         '96',
         '97',
         '98',
         '99',
      ];
      return dddsValidos.includes(ddd);
   }
}
