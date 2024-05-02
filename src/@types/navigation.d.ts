declare global {
   namespace ReactNavigation {
      interface RootParamList {
         Cadastro: undefined;
         Eventos: undefined;
         EventosDetalhe: {
            id: string;
         };
         EventosIngressos: {};
         Login: undefined;

         // private
         Perfil: undefined;
         Carrinho: {};
         CarrinhoUtilizador: {};
         Ingressos: undefined;

      }
   }
}

export { }
