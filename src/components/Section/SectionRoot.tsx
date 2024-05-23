import React from 'react'
import VStack from '../Views/Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'

type Section = BoxProps<Theme> & {
   children: React.ReactNode | React.ReactNode[]
}
export function SectionRoot({ children, ...rest }: Section) {
   return (
      <VStack backgroundColor='white' p="md" gap="md" width="100%" borderRadius={20} overflow='hidden' {...rest}>
         {children}
      </VStack>
   )
}
