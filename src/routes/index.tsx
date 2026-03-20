import React, { useEffect, useRef, useState } from 'react'

import { RouteDesLogado } from './Stack.route.deslogado';
import { RouteLogado } from './Stack.route.logado';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import api from '../services';
import { PayloadDefaultResponse } from '../services/@index';
import { ResponseErro } from '../components/ResponsesRequest/ResponseErro';
import { ResponseSucesso } from '../components/ResponsesRequest/ResponseSucesso';
import AppProvider from '../hooks';

type ErrorProps = {
   message: string;
   response: {
      data: PayloadDefaultResponse
   }
}

export function Routes() {
   const { logado, signOut } = useAuth();
   const [loadingReq, setLoadingReq] = useState(false);
   const [erro, setErro] = useState("");
   const [sucesso, setSucesso] = useState("");

   const pendingRequestsRef = useRef(0);

   useEffect(() => {
      const onRequestId = api.interceptors.request.use(
         (config) => {
            pendingRequestsRef.current += 1;
            setLoadingReq(true);
            return config;
         },
         (error) => {
            return Promise.reject(error);
         }
      );

      const onResponseId = api.interceptors.response.use(
         (response) => {
            pendingRequestsRef.current = Math.max(0, pendingRequestsRef.current - 1);
            if (pendingRequestsRef.current === 0) {
               setLoadingReq(false);
            }

            if (response?.data?.mensagem !== "Usuário Logado com sucesso") {
               setSucesso(response?.data?.mensagem || "");
            }

            return response;
         },
         (error: ErrorProps) => {
            pendingRequestsRef.current = Math.max(0, pendingRequestsRef.current - 1);
            if (pendingRequestsRef.current === 0) {
               setLoadingReq(false);
            }

            if (error?.response?.data?.codigoretorno === 401) {
               setErro(error.response.data.mensagem);
               signOut();
               return Promise.reject(error);
            }

            if (error?.response?.data?.mensagenserro.length > 0) {
               setErro(error?.response?.data?.mensagenserro?.join(", "));
               return Promise.reject(error);
            }

            if (error?.response?.data?.errors) {
               const erroMensagem = Object.keys(error.response.data.errors).map(key => error.response.data.errors[key]);
               if (erroMensagem) {
                  setErro(erroMensagem.join('\n'));
               }
               return Promise.reject(error);
            }

            if (error?.response?.data?.mensagem) {
               setErro(error?.response?.data?.mensagem);
               return Promise.reject(error);
            }

            if (error?.message) {
               setErro(error.message);
               return Promise.reject(error);
            }

            return Promise.reject(error);
         }
      );

      return () => {
         api.interceptors.request.eject(onRequestId);
         api.interceptors.response.eject(onResponseId);
      };
   }, [signOut]);

   return (
      <AppProvider>

         {erro && <ResponseErro erro={erro} clear={() => setErro('')} />}
         {sucesso && <ResponseSucesso erro={sucesso} clear={() => setSucesso('')} />}

         {logado ? <RouteLogado /> : <RouteDesLogado />}
         {loadingReq && <Loading />}

      </AppProvider>
   )
}
