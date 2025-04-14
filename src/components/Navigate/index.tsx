import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable } from 'react-native';
import { RouteApp } from '../../@types/navigation';

type NavigateProps<T extends keyof RouteApp> = {
   url: T;
   params: RouteApp[T];
   children: React.ReactNode;
};

export const Navigate = <T extends keyof RouteApp>({
   url,
   params,
   children,
}: NavigateProps<T>) => {
   const navigation =
      useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamList>>();

   return (
      <Pressable onPress={() => navigation.navigate(url as any, params)}>
         {children}
      </Pressable>
   );
};

