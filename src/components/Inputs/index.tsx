import React from 'react'
import { TextInputProps } from 'react-native'

import Text from '../Text'
import VStack from '../Views/Vstack'
import HStack from '../Views/Hstack'

export type InputDefault = TextInputProps & {
   error?: any;
   iconLeft?: React.JSX.Element;
   iconRight?: React.JSX.Element;
   label?: string;
   variant?: "transparent" | "solid"

}

type Input = InputDefault & {
   children: any;
}

export function Input({ children, iconLeft, iconRight, error, label, variant = "transparent" }: Input) {
   if (variant === "solid") {
      return (

         <VStack paddingVertical="xs" gap="sm">
            {label && <Text variant="header2" color='white'>{label}</Text>}

            <HStack
               alignItems="center"
               paddingVertical="sm"
               paddingHorizontal="md"
               backgroundColor='purple_300'
               width="100%"
               overflow='hidden'
               borderRadius={12}
               minHeight={55}
            >
               {iconLeft && iconLeft}

               {children}

               {iconRight && iconRight}

            </HStack>
            {error && <Text variant='header3' color='buttonPrimaryBackground'>{error}</Text>}

         </VStack>
      )
   }

   return (
      <VStack gap="xs" flex={1}>
         {label && <Text variant="labelInput">{label}</Text>}

         <HStack
            alignItems="center"
            paddingHorizontal="md"
            backgroundColor='white'
            width="100%"
            overflow='hidden'
            borderRadius={12}
            borderWidth={1}
            borderColor='primary'
            minHeight={55}
         >
            {iconLeft && iconLeft}

            {children}

            {iconRight && iconRight}

         </HStack>
         {error && <Text variant='header3' color='buttonPrimaryBackground'>{error}</Text>}

      </VStack>
   )
}

