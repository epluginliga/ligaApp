import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { IconCalendario, IconHome } from '../icons';
import { Perfil } from '../screens/Perfil';
import { RouteLogado } from './Logado';

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
               backgroundColor: "#f3f3f3",

               shadowColor: "#070707",
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.25,
               shadowRadius: 20,
               elevation: 5,
            },
            tabBarIcon: ({ focused }: PropsTabs) => {
               switch (route.name) {
                  case 'RouteLogado':
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
         initialRouteName="RouteLogado">
         <Tab.Screen name="RouteLogado" component={RouteLogado} />
         <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
   )
}
