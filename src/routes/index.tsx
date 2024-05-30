import React from 'react'

import { RouteDesLogado } from './Stack.route.deslogado';
import { RouteLogado } from './Stack.route.logado';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import api from '../services';

export function Routes() {
   const { logado, loading } = useAuth();
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
         console.error('Erro na resposta:', error);
         return Promise.reject(error);
      }
   );

   return (
      <>
         {logado ? <RouteLogado /> : <RouteDesLogado />}
         {loading || loadingReq && <Loading />}
      </>
   )
}
