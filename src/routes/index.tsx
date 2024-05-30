import React, { useEffect, useState } from 'react'

import { RouteDesLogado } from './Deslogado';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import api from '../services';
import { TabRouteLogado } from './TabRouteLogado';

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
         {logado ? <TabRouteLogado /> : <RouteDesLogado />}
         {loading || loadingReq && <Loading />}
      </>
   )
}
