
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login';
import { EventosDetalhe } from '../screens/Eventos/EventosDetalhe';
import { Eventos } from '../screens/Eventos';
import { Cadastro } from '../screens/Cadastro';
import { TabRoute } from './TabRoute';

const Stack = createNativeStackNavigator();

export function RouteDesLogado() {
   return (
      <Stack.Navigator screenOptions={{
         headerShown: false,
      }}>
         <Stack.Screen name="Cadastro" component={Cadastro} />
         <Stack.Screen name="Eventos" component={Eventos} />
         <Stack.Screen name="EventosDetalhe" component={EventosDetalhe} />
         <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>

   );
}
