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
   CarrinhoUtilizador: undefined;
   CarrinhoResumo: undefined;
   CheckoutEnderecoCobranca: undefined;
   CheckoutPagamento: undefined;
   CheckoutPix: undefined;
   CheckoutCartao: undefined;
   CheckoutProcessandoPagamento: undefined;
   CheckoutGerandoPix: undefined;
   IngressosTab: undefined;
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
   PerfilTab: undefined;
   PerfilMeuPerfil: undefined;
   PerfilMeusEndereco: undefined;
   PerfilMeusPedidos: undefined;
   PerfilAlterarSenha: undefined;
   PerfilFoto: undefined;
   PerfilFotoCameraSucesso: {
      path: string
   }
   AuthCriarConta: undefined;
   AuthCriarContaFoto:undefined;
   AuthCriarContaFotoSucesso: {
      path: string
   };

   Carrinho: undefined;
   Ingressos: undefined;
   IngressoTranserir: {
      ingresso_id: string;
   };
   CarrinhoCupomDesconto: undefined;
   IngressosDetalhe: IngressoDetalheProps;
   Web: {
      uri: string
   };

}

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RouteApp { }
   }
}

export { RouteApp }
