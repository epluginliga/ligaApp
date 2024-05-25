type ResponseProp = Record<TypeCard, RegExp>;

export type TypeCard = 'electron'
   | 'maestro'
   | 'dankort'
   | 'interpayment'
   | 'unionpay'
   | 'visa'
   | 'mastercard'
   | 'amex'
   | 'diners'
   | 'discover'
   | 'jcb'
   | 'hipercard'

type Bandeiras = Record<string, {
   simbol?: React.ReactNode
   colors?: string[]
}>


export class CartaoCredito {
   private numeroCartao = '';

   constructor(numero: string) {
      this.numeroCartao = numero;
   }

   detectaBandeiraCartao() {
      const newNumber = this.numeroCartao.replace(/\D/g, '')

      const bandeira: ResponseProp = {
         electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
         maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
         dankort: /^(5019)\d+$/,
         interpayment: /^(636)\d+$/,
         unionpay: /^(62|88)\d+$/,
         visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
         mastercard: /^5[1-5][0-9]{14}$/,
         amex: /^3[47][0-9]{13}$/,
         diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
         discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
         jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
         hipercard: /^6(?:062)[0-9]{12}$/
      }

      for (const key in bandeira) {
         if (bandeira[key as TypeCard].test(newNumber)) {
            return key
         }
      }

   }

   public bandeiras: Bandeiras = {
      elo: {
         simbol: null,
         colors: ['#60a5fa', '#bfdbfe']
      },
      mastercard: {
         simbol: null,
         colors: ['#F6CE92', '#E57F8B', '#F6CE92']
      },
      visa: {
         simbol: null,
         colors: ['#2566AF', '#E6A540']
      },
      amex: {
         simbol: null,
         colors: ['#4F9CFA', '#A6CCFB']
      },
      hipercard: {
         simbol: null,
         colors: ['#F94040', '#FFFFFF']
      },
      jcb: {
         simbol: null,
         colors: ['#268480', '#d4d4d8']
      },
      aura: {
         simbol: null,
         colors: ['#F6B452', '#F6CE92']
      },
      diners: {
         simbol: null,
         colors: ['#60a5fa', '#bfdbfe']
      },
      discover: {
         colors: ['#a2a2a2', '#F6CE92']
      }
   }
}