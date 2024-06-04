export class Maskara {

   static dinheiro(valor: number) {
      return new Intl
         .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
         .format(valor);
   }

}