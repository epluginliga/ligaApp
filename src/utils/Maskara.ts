export class Maskara {

   static dinheiro(valor: number) {
      return new Intl
         .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
         .format(valor);
   }

}

export const cpfMask = (value: string) => {
   if (!value) {
      return ''
   }
   return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
}

export const dataMask = (value: string) => {
   return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
}

export const telefoneMask = (value: string) => {
   return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)$/, '$1')
}
