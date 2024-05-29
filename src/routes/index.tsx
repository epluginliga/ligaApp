import React, { useEffect, useState } from 'react'

import { RouteDesLogado } from './Deslogado';
import { useAuth } from '../hooks/auth';
import { RouteLogado } from './Logado';
import Text from '../components/Text';

export function Routes() {
   const { logado, loading } = useAuth();

   if (loading) {
      return <Text>Carrendo rota</Text>
   }

   if (logado) {
      console.log("logado");

      return <RouteLogado />
   }

   console.log("deslogado");
   return <RouteDesLogado />
}
