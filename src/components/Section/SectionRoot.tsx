import React from 'react'
import VStack from '../Views/Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'

type Section = BoxProps<Theme> & {
   children: React.ReactNode | React.ReactNode[]
}
export function SectionRoot({ children, ...rest }: Section) {
   return (
      <VStack backgroundColor='bege' p="md" gap="md" width="100%" borderRadius={12} {...rest}>
         {children}
      </VStack>
   )
}
