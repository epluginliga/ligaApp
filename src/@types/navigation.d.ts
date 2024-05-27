type RouteApp = {
   Cadastro: undefined;
   Eventos: undefined;
   EventosDetalhe: {
      id: string;
   };
   Login: undefined;
   EsqueciSenha: undefined;
   CriarConta: undefined;
   CarrinhoUtilizador: undefined;
   CarrinhoResumo: undefined;
   CheckoutEnderecoCobranca: undefined;
   CheckoutPagamento: undefined;
   CheckoutPix: undefined;
   CheckoutCartao: undefined;


   // private
   Perfil: undefined;
   Carrinho: undefined;
   Ingressos: undefined;
   IngressosDetalhe: {
      id: string;
   };
}

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RouteApp { }
   }
}

export { RouteApp }
