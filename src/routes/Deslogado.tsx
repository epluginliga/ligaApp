
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

const Stack = createNativeStackNavigator();

export function RouteDesLogado() {
   const defaultHeader: NativeStackNavigationOptions = {
      headerTitleStyle: {
         fontWeight: "400",
         fontSize: 16,
         fontFamily: "Poppins-SemiBold",

      },
      headerShadowVisible: false,
      headerShown: true,
      headerStyle: {
         backgroundColor: "#FCFCFC",
      },
   };

   return (
      <>
         <StatusBarApp />

         <Stack.Navigator initialRouteName="TabRoute" screenOptions={{
            headerShown: false,
            contentStyle: {
               backgroundColor: "#FCFCFC",
            }
         }}>
            <Stack.Screen name="Eventos" component={Eventos} options={{
            }} />
            <Stack.Screen name="EventosDetalhe" component={EventosDetalhe} options={{
               title: "Detalhe do evento",
               ...defaultHeader
            }} />
            <Stack.Screen name="CarrinhoUtilizador" component={CarrinhoUtilizador} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
            <Stack.Screen name="Ingressos" component={Ingressos} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="TabRoute" component={TabRoute} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EsqueciSenha" component={EsqueciSenha}
               options={{
                  title: "Recuperar Senha",
                  ...defaultHeader
               }}
            />
            <Stack.Screen name="CriarConta" component={CriarConta}
               options={{
                  title: "Cadastro",
                  ...defaultHeader
               }}
            />
         </Stack.Navigator>
      </>
   );
}