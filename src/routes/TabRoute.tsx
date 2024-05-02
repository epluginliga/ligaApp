import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Text, View } from 'react-native'
import { IconCalendario, IconHome } from '../icons';
import { Eventos } from '../screens/Eventos';
import { Perfil } from '../screens/Perfil';

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
            tabBarIcon: ({ focused }: PropsTabs) => {
               switch (route.name) {
                  case 'Eventos':
                     return focused ? (
                        <IconHome size={30} />
                     ) : (
                        <IconHome />
                     );

                  case 'Perfil':
                     return focused ? (
                        <IconCalendario size={30} />
                     ) : (
                        <IconCalendario />
                     );
               }
            },
            headerShown: false,
            tabBarShowLabel: false,
         })}
         initialRouteName="Eventos">
         <Tab.Screen name="Eventos" component={Eventos} />
         <Tab.Screen name="Perfil" component={Perfil} />

      </Tab.Navigator>
   )
}
