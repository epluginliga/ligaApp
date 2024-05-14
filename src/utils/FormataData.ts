import { isValid, format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
export class FormatData {
   private data = '';

   constructor(data: string) {
      if (!data || !isValid(new Date(data))) {
         throw new Error('Por favor, forneça uma data válida.');
      }
      this.data = data;
   }

   DiaMesAnoTexto(formato = "eeee, d 'de' MMMM", locale = ptBR) {
      return format(new Date(this.data), formato, { locale });
   }

   hora() {
      return `${format(new Date(this.data), 'H')}h`;
   }

   DiaMesAnoISOBR(formato = "dd/MM/yyyy", locale = ptBR) {
      return format(new Date(this.data), formato, { locale });
   }
}