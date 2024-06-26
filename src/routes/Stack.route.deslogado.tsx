
import React from 'react'
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import { EventosDetalhe } from '../screens/Eventos/EventosDetalhe';
import { Login } from '../screens/Auth/Login';
import { EsqueciSenha } from '../screens/Auth/EsqueciSenha';
import { CriarConta } from '../screens/Auth/CriarConta';
import { IngressoDetalhe } from '../screens/Ingressos/IngressoDetalhe';
import { TabRouteDeslogado } from './Tab.route.deslogado';

const Stack = createNativeStackNavigator();

export function RouteDesLogado() {
   return (
      <>
         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
               headerShown: false,
               contentStyle: {
                  backgroundColor: "#f5f5f5",
               }               
            }}>

            <Stack.Screen name="Home" component={TabRouteDeslogado} />

            <Stack.Screen name="Eventos" component={Eventos} />
            <Stack.Screen name="EventosDetalhe" component={EventosDetalhe} />
            <Stack.Screen name="Ingressos" component={Ingressos} />
            <Stack.Screen name="IngressosDetalhe" component={IngressoDetalhe} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
            <Stack.Screen name="CriarConta" component={CriarConta} />
         </Stack.Navigator>
      </>
   );
}
