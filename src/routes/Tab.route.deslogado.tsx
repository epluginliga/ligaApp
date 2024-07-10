import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '../icons';
import { Ingressos } from '../screens/Ingressos';
import { Eventos } from '../screens/Eventos';
import VStack from '../components/Views/Vstack';

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
               borderTopRightRadius: 25,
               borderTopLeftRadius: 25,
               borderCurve: "circular",
               borderTopWidth: 0,
               overflow: "hidden",
               minHeight: 60,
               justifyContent: "center",
               alignItems: 'center',
               contentStyle: {
                  backgroundColor: "#fff",
               }
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
         <Tab.Screen name="IngressosTab" component={Ingressos} />
      </Tab.Navigator>
   )
}
