import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { RouteDesLogado } from './Deslogado';
import { StatusBarApp } from '../components/StatusBarApp';

export function Routes() {
   return (
      <NavigationContainer>
         <RouteDesLogado />
      </NavigationContainer>
   );
}
