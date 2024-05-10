import React from 'react'
import Text from '../Text'
import HStack from '../Views/Hstack';

type Section = {
   children: string | React.ReactNode,
   iconLeft?: React.ReactNode,
   iconRight?: React.ReactNode,
}
export function SectionSubTitle({ children, iconLeft, iconRight }: Section) {
   if (iconLeft || iconRight) {
      return (
         <HStack>
            {iconLeft && iconLeft}
            <Text variant='botaoLink'>{children}</Text>
            {iconRight && iconRight}
         </HStack>
      );
   }

   return <Text variant='botaoLink'>{children}</Text>
}
