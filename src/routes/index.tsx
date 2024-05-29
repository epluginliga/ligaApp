import React from 'react'

import { RouteDesLogado } from './Deslogado';
import {  useAuth } from '../hooks/auth';
import { RouteLogado } from './Logado';

export function Routes() {
   const { logado } = useAuth();

   if(logado) {
      return <RouteLogado />
   }

   return <RouteDesLogado />
}
