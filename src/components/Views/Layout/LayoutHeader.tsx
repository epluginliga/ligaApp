import React from 'react'

import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import HStack from '../Hstack'
import Text from '../../Text'
import VStack from '../Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../../theme/default'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '../../../icons'

type LayoutHeader = BoxProps<Theme> & {
   title?: string;
   variant?: "white" | "default";
   rigth?: any;
   children?: React.ReactNode;
   handleBack?: () => void;
}

export function LayoutHeader({ title, rigth, children, variant = "default", handleBack, ...rest }: LayoutHeader) {
   const { goBack } = useNavigation();
   const insets = useSafeAreaInsets();

   return (
      <Pressable style={{ marginTop: insets.top }} onPress={() => handleBack ? handleBack() : goBack()}>

         <HStack paddingHorizontal='md' paddingBottom='sm' alignItems='center' {...rest}>
            <Icon.ArrowLeft />

            <VStack justifyContent='center' flex={1}>
               {children ? children : (
                  <Text variant={variant === "default" ? 'header' : "headerWhite"} textAlign="center">{title}</Text>
               )}

            </VStack>

            {rigth && rigth}
         </HStack>
      </Pressable>
   )
}
