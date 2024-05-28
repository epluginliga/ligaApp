import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { RouteDesLogado } from './Deslogado';
import { AuthProvider, useAuth } from '../hooks/auth';
import { RouteLogado } from './Logado';

export function Routes() {
   const { logado } = useAuth();

   console.log("tabs: oioioioi", logado);
   return (
      <>
         
            {logado ? <RouteLogado /> : <RouteDesLogado />}
      </>
   );
}
