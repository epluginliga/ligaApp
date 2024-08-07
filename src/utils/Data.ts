import { isValid, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export class Data {
   private data = new Date();

   constructor(data?: string) {
      if (!data || !isValid(new Date(data))) {
         this.data = new Date();
      } else {
         this.data = parseISO(data);
      }
   }

   diaMesAnoTexto(formato = "eeee, d 'de' MMMM", locale = ptBR) {
      return format(new Date(this.data), formato, { locale });
   }

   hora() {
      return `${format(new Date(this.data), 'H')}h`;
   }

   diaSemana() {
      return format(this.data, 'EEEE', { locale: ptBR });
   }

   diaMes() {
      return format(this.data, 'dd');
   }

   nomeMes() {
      return format(this.data, 'MMM', { locale: ptBR });
   }

   nomeFullMes() {
      return format(this.data, 'MMMM', { locale: ptBR });
   }

   diaMesAnoISOBR(formato = "dd/MM/yyyy", locale = ptBR) {
      return format(new Date(this.data), formato, { locale });
   }

   converteDataBRtoISO(date: string) {
      if (!date) {
         throw new Error("converteDataBRtoISO parametro obrigatório");
      }

      let hora = date?.split(" ")?.[1];
      const removeHora = date?.split(" ")?.[0]?.split("/");

      return `${removeHora?.reverse()?.join("-")} ${hora}`;
   }
   
}

