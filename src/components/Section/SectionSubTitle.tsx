import React from 'react'
import Text from '../Text'
import HStack from '../Views/Hstack';
import { TextProps } from '@shopify/restyle';
import { Theme } from '../../theme/default';

type Section = TextProps<Theme> & {
   children: string | React.ReactNode,
   iconLeft?: React.ReactNode,
   iconRight?: React.ReactNode,
}
export function SectionSubTitle({ children, iconLeft, iconRight, ...rest }: Section) {
   if (iconLeft || iconRight) {
      return (
         <HStack alignItems='center'>
            {iconLeft && iconLeft}
            <Text variant='botaoLink' {...rest}>{children}</Text>
            {iconRight && iconRight}
         </HStack>
      );
   }

   return <Text variant='botaoLink' {...rest}>{children}</Text>
}
