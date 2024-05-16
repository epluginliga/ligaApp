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

   // private
   Perfil: undefined;
   Carrinho: undefined;
   CarrinhoUtilizador: {};
   Ingressos: undefined;
}

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RouteApp { }
   }
}

export { RouteApp }
