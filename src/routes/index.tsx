import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';

import { RouteDesLogado } from './Deslogado'
import { RouteLogado } from './Logado';

export function Routes() {
   const auth = false;
   return (
      <NavigationContainer>
         <SafeAreaView />
         {auth ? <RouteLogado /> : <RouteDesLogado />}
      </NavigationContainer>
   );
}
