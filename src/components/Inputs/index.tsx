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
}

type Input = InputDefault & {
   children: any;
}

export function Input({ children, iconLeft, iconRight, error, label }: Input) {
   return (

      <VStack paddingVertical="sm" gap="sm" flex={1} >
         {label && <Text variant="header2" color='white'>{label}</Text>}

         <HStack alignItems="center" paddingVertical="sm" paddingHorizontal="md" backgroundColor='purple_300' width="100%" overflow='hidden' borderRadius={12}>
            {iconLeft && iconLeft}

            {children}

            {iconRight && iconRight}

         </HStack>
         {error && <Text variant='header3' color='buttonPrimaryBackground'>{error}</Text>}

      </VStack>
   )
}

