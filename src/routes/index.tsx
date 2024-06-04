import React from 'react'

import { RouteDesLogado } from './Stack.route.deslogado';
import { RouteLogado } from './Stack.route.logado';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import api from '../services';
import { CarrinhoProvider } from '../hooks/carrinho';

export function Routes() {
   const { logado, loading, signOut } = useAuth();
   const [loadingReq, setLoadingReq] = React.useState(false);
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
      (error) => {
         setLoadingReq(false);
         if (error.response?.data?.codigoretorno === 401) {
            signOut();
         }
         return Promise.reject(error);
      }
   );

   if (loading) {
      return <Loading />;
   }

   return (
      <>
         {logado ? (
            <CarrinhoProvider>
               <RouteLogado />
            </CarrinhoProvider>
         ) :
            (
               <RouteDesLogado />
            )
         }
         {loadingReq && <Loading />}
      </>
   )
}
