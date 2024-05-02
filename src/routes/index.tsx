import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { RouteDesLogado } from './Deslogado'
import { RouteLogado } from './Logado';

export function Routes() {
   const auth = false;
   return (
      <NavigationContainer >
         {auth ? <RouteLogado /> : <RouteDesLogado />}
      </NavigationContainer>
   )

}
