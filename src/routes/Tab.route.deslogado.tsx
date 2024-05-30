import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '../icons';
import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import VStack from '../components/Views/Vstack';
import { KEY_REDIRECT, useAuth } from '../hooks/auth';
import { Login } from '../screens/Auth/Login';
import { Perfil } from '../screens/Perfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/Text';
import { TabRouteLogado } from './Tab.route.logado';
import { RouteLogado } from './Stack.route.logado';
import { RouteDesLogado } from './Stack.route.deslogado';

const Tab = createBottomTabNavigator();
interface PropsTabs {
   focused: boolean;
   color?: string;
   size?: number;
}

export function TabRouteDeslogado() {
   return (
      <Tab.Navigator
         initialRouteName='EventosTab'
         screenOptions={({ route }) => ({
            tabBarStyle: {
               borderTopRightRadius: 20,
               borderTopLeftRadius: 20,
               borderCurve: "circular",
               borderTopWidth: 0,
               backgroundColor: "#fff",
               overflow: "hidden",
            },
            tabBarIcon: ({ focused }: PropsTabs) => {
               switch (route.name) {
                  case 'EventosTab':
                     return focused ? (
                        <VStack overflow='hidden' backgroundColor='background_red_tab' borderRadius={12} p="sm">
                           <Icon.Home />
                        </VStack>
                     ) : (
                        <Icon.Home />

                     );

                  case 'IngressosTab':
                     return focused ? (
                        <VStack backgroundColor='background_red_tab' borderRadius={12} p="sm">
                           <Icon.Calendario />
                        </VStack>
                     ) : (
                        <Icon.Calendario />
                     );
               }
            },
            headerShown: false,
            tabBarShowLabel: false,
         })}>
         <Tab.Screen name="EventosTab" component={Eventos} />
         <Tab.Screen name="IngressosTab" component={Login}  />
      </Tab.Navigator>
   )
}
