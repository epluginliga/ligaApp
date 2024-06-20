import React from 'react'
import Text from '../Text'
import { TextProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import HStack from '../Views/Hstack'

export type CardSpan = TextProps<Theme> & {
   children: React.ReactNode;
   leftIcon?: React.ReactNode;
}

export function CardSpan({ children, leftIcon, ...rest }: CardSpan) {
   if (leftIcon) {
      return (
         <HStack alignItems='center'>
            {leftIcon}
            <Text variant="header3" pt='xs' {...rest}>
               {children}
            </Text>
         </HStack>
      )
   }

   return (
      <Text variant="header3" {...rest}>{children}</Text>
   )
}
