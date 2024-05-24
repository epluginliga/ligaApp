import React from 'react'
import VStack, { VStackProps } from '../Views/Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'

type Section = BoxProps<Theme> & VStackProps & {
   children: React.ReactNode | React.ReactNode[]
}
export function SectionRoot({ children, paddingHorizontal = 'sm', ...rest }: Section) {
   return (
      <VStack marginHorizontal={paddingHorizontal} >
         <VStack backgroundColor='bege' variant='shadow' p="md" gap="md" width="100%" borderRadius={20} overflow='hidden' {...rest}>
            {children}
         </VStack>
      </VStack>
   )
}
