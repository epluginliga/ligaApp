import { IngressoDetalheProps } from "../services/@eventos";

export type RouteApp = {
   Cadastro: undefined;
   Eventos: undefined;
   EventosDetalhe: {
      id: string;
   };
   Login?: {
      redirect: RootParamList;
   };
   EsqueciSenha: undefined;
   CriarConta: undefined;
   CarrinhoUtilizador: undefined;
   CarrinhoResumo: undefined;
   CheckoutEnderecoCobranca: undefined;
   CheckoutPagamento: undefined;
   CheckoutPix: undefined;
   CheckoutCartao: undefined;
   CheckoutSucesso: {
      codigo: string;
      mensagem: string;
   };
   CheckoutFalha: {
      codigo: string;
      mensagem: string;
   };
   Home: undefined;


   // private
   Perfil: undefined;
   Carrinho: undefined;
   Ingressos: undefined;
   CarrinhoCupomDesconto: undefined;
   IngressosDetalhe: IngressoDetalheProps
}

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RouteApp { }
   }
}

export { RouteApp }
