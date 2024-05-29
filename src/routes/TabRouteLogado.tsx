import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '../icons';
import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import VStack from '../components/Views/Vstack';
import { Perfil } from '../screens/Perfil';

const Tab = createBottomTabNavigator();
interface PropsTabs {
   focused: boolean;
   color?: string;
   size?: number;
}

export function TabRouteLogado() {

   return (
      <Tab.Navigator
         initialRouteName='Eventos'
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
                  case 'Perfil':
                     return focused ? (
                        <VStack backgroundColor='background_red_tab' borderRadius={12} p="sm">
                           <Icon.User />
                        </VStack>
                     ) : (
                        <Icon.User />
                     );
               }
            },
            headerShown: false,
            tabBarShowLabel: false,
         })}>
         <Tab.Screen name="Eventos" component={Eventos} />
         <Tab.Screen name="IngressosTab" component={Ingressos} />
         <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
   )
}
