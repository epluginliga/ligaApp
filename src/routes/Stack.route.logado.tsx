
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Perfil } from '../screens/Perfil';
import { Carrinho } from '../screens/Carrinho';
import { CarrinhoUtilizador } from '../screens/Carrinho/CarrinhoUtilizador';
import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import { EventosDetalhe } from '../screens/Eventos/EventosDetalhe';
import { Linking, StatusBar } from 'react-native';
import { CarrinhoResumo } from '../screens/Carrinho/CarrinhoResumo';
import { CheckoutEnderecoCobranca } from '../screens/Checkout/CheckoutEnderecoCobranca';
import { CheckoutPagamento } from '../screens/Checkout/CheckoutPagamento';
import { CheckoutPix } from '../screens/Checkout/CheckoutPix';
import { CheckoutCartao } from '../screens/Checkout/CheckoutCartao';
import { IngressoDetalhe } from '../screens/Ingressos/IngressoDetalhe';
import { TabRouteLogado } from './Tab.route.logado';
import { CarrinhoCupomDesconto } from '../screens/Carrinho/CarrinhoCupomDesconto';
import { CheckoutFalha } from '../screens/Checkout/CheckoutFalha';
import { CheckoutSucesso } from '../screens/Checkout/CheckoutSucesso';
import { PerfilMeuPerfil } from '../screens/Perfil/PerfilMeuPerfil';
import { PerfilMeusEndereco } from '../screens/Perfil/PerfilMeusEndereco';
import { PerfilMeusPedidos } from '../screens/Perfil/PerfilMeusPedidos';
import { PerfilAlterarSenha } from '../screens/Perfil/PerfilAlterarSenha';
import { IngressoTransferir } from '../screens/Ingressos/IngressoTransferir';
import { CheckoutProcessandoPagamento } from '../screens/Checkout/CheckoutProcessandoPagamento';
import { CheckoutGerandoPix } from '../screens/Checkout/CheckoutGerandoPix';

const Stack = createNativeStackNavigator();

export function RouteLogado() {
   return (
      <>
         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
               headerShown: false,
               contentStyle: {
                  backgroundColor: "#fff",
               }
            }}>

            <Stack.Group>
               <Stack.Screen name="Home" component={TabRouteLogado} />

               <Stack.Screen name="Eventos" component={Eventos} />
               <Stack.Screen name="EventosDetalhe" component={EventosDetalhe} />
               <Stack.Screen name="Ingressos" component={Ingressos} />
               <Stack.Screen name="IngressosDetalhe" component={IngressoDetalhe} />

               <Stack.Screen name="Carrinho" component={Carrinho} />
               <Stack.Screen name="CarrinhoUtilizador" component={CarrinhoUtilizador} />
               <Stack.Screen name="CarrinhoResumo" component={CarrinhoResumo} />

               <Stack.Screen name="Perfil" component={Perfil} />
               <Stack.Screen name="PerfilMeuPerfil" component={PerfilMeuPerfil} />
               <Stack.Screen name="PerfilMeusEndereco" component={PerfilMeusEndereco} />
               <Stack.Screen name="PerfilMeusPedidos" component={PerfilMeusPedidos} />
               <Stack.Screen name="PerfilAlterarSenha" component={PerfilAlterarSenha} />

               <Stack.Screen name="CheckoutEnderecoCobranca" component={CheckoutEnderecoCobranca} />
               <Stack.Screen name="CheckoutPagamento" component={CheckoutPagamento} />
               <Stack.Screen name="CheckoutPix" component={CheckoutPix} />
               <Stack.Screen name="CheckoutCartao" component={CheckoutCartao} />
               <Stack.Screen name="CheckoutFalha" component={CheckoutFalha} />
               <Stack.Screen name="CheckoutSucesso" component={CheckoutSucesso} />
               <Stack.Screen name="CheckoutProcessandoPagamento" component={CheckoutProcessandoPagamento as any} />
               <Stack.Screen name="CheckoutGerandoPix" component={CheckoutGerandoPix as any} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
               <Stack.Screen name="CarrinhoCupomDesconto" component={CarrinhoCupomDesconto} />
               <Stack.Screen name="IngressoTranserir" component={IngressoTransferir} />
            </Stack.Group>

         </Stack.Navigator>
      </>
   );
}
