import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '../icons';
import { Perfil } from '../screens/Perfil';
import { Ingressos } from '../screens/Ingressos';
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
                        <Icon.Home />
                     ) : (
                        <Icon.Home />
                     );

                  case 'IngressosTab':
                     return focused ? (
                        <Icon.Calendario />
                     ) : (
                        <Icon.Calendario />
                     );
                  case 'Perfil':
                     return focused ? (
                        <Icon.User />
                     ) : (
                        <Icon.User />
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
