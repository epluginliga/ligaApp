import React,{ useState } from 'react'

import { RouteDesLogado } from './Stack.route.deslogado';
import { RouteLogado } from './Stack.route.logado';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import api from '../services';
import { CarrinhoProvider } from '../hooks/carrinho';
import { PayloadDefaultError } from '../services/@index';
import { ErroRequest } from '../components/ErroRequest';

type ErrorProps = {
   response: {
      data: PayloadDefaultError
   }
}

export function Routes() {
   const { logado,signOut } = useAuth();
   const [loadingReq,setLoadingReq] = useState(false);
   const [erro,setErro] = useState("");

   api.interceptors.request.use(
      (config) => {
         setLoadingReq(true);
         return config;
      },
      (error) => {
         return Promise.reject(error);
      }
   );

   api.interceptors.response.use(
      (response) => {
         setLoadingReq(false);
         return response;
      },
      (error: ErrorProps) => {
         setLoadingReq(false);
         if (error.response?.data?.codigoretorno === 401) {
            signOut();
         }

         setErro(error?.response?.data?.mensagenserro?.join(", ") || "");
         return Promise.reject(error);
      }
   );

   return (
      <CarrinhoProvider>

         {erro && <ErroRequest erro={erro} clear={() => setErro('')} />}

         {logado ? <RouteLogado /> : <RouteDesLogado />}
         {loadingReq && <Loading />}
      </CarrinhoProvider>
   )
}
