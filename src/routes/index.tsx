import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { RouteDesLogado } from './Deslogado';

export function Routes() {
   return (
      <NavigationContainer>
         <RouteDesLogado />
      </NavigationContainer>
   );
}
