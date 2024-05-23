
import React from 'react'
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import { Perfil } from '../screens/Perfil';
import { Carrinho } from '../screens/Carrinho';
import { CarrinhoUtilizador } from '../screens/Carrinho/CarrinhoUtilizador';
import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import { EventosDetalhe } from '../screens/Eventos/EventosDetalhe';
import { TabRoute } from './TabRoute';
import { Login } from '../screens/Auth/Login';
import { StatusBarApp } from '../components/StatusBarApp';
import { EsqueciSenha } from '../screens/Auth/EsqueciSenha';
import { CriarConta } from '../screens/Auth/CriarConta';
import { StatusBar } from 'react-native';
import { CarrinhoResumo } from '../screens/Carrinho/CarrinhoResumo';

const Stack = createNativeStackNavigator();

export function RouteDesLogado() {

   return (
      <>
         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <Stack.Navigator
            initialRouteName="TabRoute"
            screenOptions={{
               headerShown: false,
               contentStyle: {
                  backgroundColor: "#FCFCFC",
               }
            }}>
            <Stack.Screen name="Eventos" component={Eventos} />
            <Stack.Screen name="EventosDetalhe" component={EventosDetalhe} />
            <Stack.Screen name="CarrinhoUtilizador" component={CarrinhoUtilizador} />
            <Stack.Screen name="CarrinhoResumo" component={CarrinhoResumo} />

            <Stack.Screen name="Carrinho" component={Carrinho} />
            <Stack.Screen name="Ingressos" component={Ingressos} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="TabRoute" component={TabRoute} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
            <Stack.Screen name="CriarConta" component={CriarConta} />
         </Stack.Navigator>
      </>
   );
}
