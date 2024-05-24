type RouteApp = {
   Cadastro: undefined;
   Eventos: undefined;
   EventosDetalhe: {
      id: string;
   };
   EventosIngressos: {};
   Login: undefined;
   EsqueciSenha: undefined;
   CriarConta: undefined;
   CarrinhoUtilizador: undefined;
   CarrinhoResumo: undefined;
   CheckoutEnderecoCobranca: undefined;
   CheckoutPagamento: undefined;
   CheckoutPix: undefined;


   // private
   Perfil: undefined;
   Carrinho: undefined;
   Ingressos: undefined;
}

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RouteApp { }
   }
}

export { RouteApp }
