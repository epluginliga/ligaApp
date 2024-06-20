import React from 'react'
import Text from '../Text'
import { TextProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import HStack from '../Views/Hstack'

export type CardSubtitle = TextProps<Theme> & {
   children: React.ReactNode;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
}

export function CardSubTitle({ children, leftIcon, rightIcon, ...rest }: CardSubtitle) {
   if (leftIcon) {
      return (
         <HStack alignItems='center' flex={1}>
            {leftIcon}
            <Text variant="header2" pt='xs' {...rest}>
               {children}
            </Text>
            {rightIcon}
         </HStack>
      )
   }

   return <Text variant="header2" {...rest}>{children}</Text>
}
