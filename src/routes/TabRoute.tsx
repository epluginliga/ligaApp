import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
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
            tabBarStyle: {
               borderRadius: 30,
               borderCurve: "circular",
               borderTopWidth: 0,

               shadowColor: "#868686",
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.25,
               shadowRadius: 20,
               elevation: 5,
            },
            tabBarIcon: ({ focused }: PropsTabs) => {
               switch (route.name) {
                  case 'Eventos':
                     return focused ? (
                        <IconHome />
                     ) : (
                        <IconHome />
                     );

                  case 'Perfil':
                     return focused ? (
                        <IconCalendario />
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
