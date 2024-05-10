import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { IconCalendario, IconHome, IconUser } from '../icons';
import { Perfil } from '../screens/Perfil';
import { RouteLogado } from './Logado';
import { Ingressos } from '../screens/Ingressos';
import { RouteDesLogado } from './Deslogado';
import { Eventos } from '../screens/Eventos';

const Tab = createBottomTabNavigator();

interface PropsTabs {
   focused: boolean;
   color?: string;
   size?: number;
}

export function TabRoute() {
   return (
      <Tab.Navigator
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
                  case 'Eventos':
                     return focused ? (
                        <IconHome />
                     ) : (
                        <IconHome />
                     );

                  case 'IngressosTab':
                     return focused ? (
                        <IconCalendario />
                     ) : (
                        <IconCalendario />
                     );
                  case 'Perfil':
                     return focused ? (
                        <IconUser />
                     ) : (
                        <IconUser />
                     );
               }
            },
            headerShown: false,
            tabBarShowLabel: false,
         })}
         initialRouteName="Eventos">
         <Tab.Screen name="Eventos" component={Eventos} />
         <Tab.Screen name="IngressosTab" component={Ingressos} />
         <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
   )
}
