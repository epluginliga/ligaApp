import React from 'react'

import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import HStack from '../Hstack'
import { IconArrowLeft } from '../../../icons/IconArrow'
import Text from '../../Text'
import VStack from '../Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../../theme/default'

type LayoutHeader = BoxProps<Theme> & {
   title?: string;
   variant?: "white" | "default";
   rigth?: any;
   children?: React.ReactNode;
   handleBack?: () => void;
}

export function LayoutHeader({ title, rigth, children, variant = "default", handleBack, ...rest }: LayoutHeader) {
   const { goBack } = useNavigation();

   return (
      <HStack paddingHorizontal='md' paddingBottom='sm' alignItems='center' {...rest}>
         <Pressable onPress={() => handleBack ? handleBack() : goBack()}>
            <IconArrowLeft />
         </Pressable>

         <VStack justifyContent='center' flex={1}>
            <Pressable onPress={() => handleBack ? handleBack() : goBack()}>
               {children ? children : (
                  <Text variant={variant === "default" ? 'header' : "headerWhite"} textAlign="center">{title}</Text>
               )}
            </Pressable>
         </VStack>

         {rigth && rigth}
      </HStack>
   )
}
