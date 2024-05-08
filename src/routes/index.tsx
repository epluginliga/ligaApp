import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { RouteDesLogado } from './Deslogado'
import { RouteLogado } from './Logado';
import { TabRoute } from './TabRoute';

export function Routes() {
   const auth = false;
   return (
      <NavigationContainer>
         {/* {auth ? <RouteLogado /> : <RouteDesLogado />} */}
         <TabRoute />
      </NavigationContainer>
   );
}
