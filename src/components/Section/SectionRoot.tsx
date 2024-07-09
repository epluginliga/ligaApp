import React from 'react'
import VStack, { VStackProps } from '../Views/Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import { DiamontDown } from '../../icons/Diamont'

type Section = BoxProps<Theme> & VStackProps & {
   children: React.ReactNode | React.ReactNode[]
}
export function SectionRoot({ children, paddingHorizontal = 'sm', ...rest }: Section) {
   return (
      <VStack marginHorizontal={paddingHorizontal} >
         <VStack backgroundColor='bege' p="md" gap="md" width="100%" borderTopStartRadius={5} borderTopEndRadius={5} overflow='hidden' {...rest}>
            {children}
         </VStack>
         <DiamontDown />
      </VStack>
   )
}
