import React from 'react'
import Text from '../Text'
import HStack from '../Views/Hstack';

type Section = {
   children: string,
   iconLeft?: React.ReactNode,
   iconRight?: React.ReactNode,
}
export function SectionSpan({ children, iconLeft, iconRight }: Section) {
   if (iconLeft || iconRight) {
      return (
         <HStack>
            {iconLeft && iconLeft}
            <Text variant='header3'>{children}</Text>
            {iconRight && iconRight}
         </HStack>
      );
   }

   return <Text variant='header3'>{children}</Text>
}
