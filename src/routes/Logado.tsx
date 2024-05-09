
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Perfil } from '../screens/Perfil';
import { Carrinho } from '../screens/Carrinho';
import { CarrinhoUtilizador } from '../screens/Carrinho/CarrinhoUtilizador';
import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import { EventosDetalhe } from '../screens/Eventos/EventosDetalhe';

const Stack = createNativeStackNavigator();

export function RouteLogado() {
   return (
      <Stack.Navigator
         initialRouteName="Eventos"
         screenOptions={{
            headerShown: false,
            contentStyle: {
               backgroundColor: "#ebebeb",
            }
         }}>
         <Stack.Screen name="Eventos" component={Eventos} />
         <Stack.Screen name="EventosDetalhe" component={EventosDetalhe} />
         <Stack.Screen name="CarrinhoUtilizador" component={CarrinhoUtilizador} />
         <Stack.Screen name="Carrinho" component={Carrinho} />
         <Stack.Screen name="Ingressos" component={Ingressos} />
         <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
   );
}
