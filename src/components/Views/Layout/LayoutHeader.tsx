import React from 'react'

import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import HStack from '../Hstack'
import { IconArrowLeft } from '../../../icons/IconArrow'
import Text from '../../Text'
import VStack from '../Vstack'

type LayoutHeader = {
   title?: string;
   variant?: "white" | "default";
   rigth?: any;
   children?: React.ReactNode;
}

export function LayoutHeader({ title, rigth, children, variant = "default" }: LayoutHeader) {
   const { goBack } = useNavigation();

   return (
      <HStack paddingHorizontal='md' paddingBottom='sm' alignItems='center'>
         <Pressable onPress={goBack}>
            <IconArrowLeft />
         </Pressable>

         <VStack justifyContent='center' flex={1}>
            <Pressable onPress={goBack}>
               {children ? children : (
                  <Text variant={variant === "default" ? 'header' : "headerWhite"} textAlign="center">{title}</Text>
               )}
            </Pressable>
         </VStack>

         {rigth && rigth}
      </HStack>
   )
}
