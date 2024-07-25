import React, { useState } from 'react'
import VStack, { VStackProps } from '../Views/Vstack'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import { DiamontDown } from '../../icons/Diamont'
import { Pressable } from 'react-native'
import Text from '../Text'
import HStack from '../Views/Hstack'

type Section = BoxProps<Theme> & VStackProps & {
   children: React.ReactNode | React.ReactNode[];
   tituloFechar?: string;

}
export function SectionRoot({ children, paddingHorizontal = 'sm', tituloFechar, ...rest }: Section) {
   const [mostrar, setMostrar] = useState(true);

   if (tituloFechar && !mostrar) {
      return (
         <VStack marginHorizontal={paddingHorizontal} >
            <Pressable onPress={() => setMostrar(true)}>
               <VStack
                  backgroundColor='bege'
                  p="md"
                  gap="md"
                  width="100%"
                  borderTopStartRadius={5}
                  borderTopEndRadius={5}
                  overflow='hidden'
                  {...rest}>
                  <Text color='azul'>{tituloFechar}</Text>
               </VStack>
               <DiamontDown />
            </Pressable>
         </VStack>
      )
   }
   return (
      <VStack marginHorizontal={paddingHorizontal} >

         <VStack backgroundColor='bege' p="md" gap="md" width="100%" borderTopStartRadius={5} borderTopEndRadius={5} overflow='hidden' {...rest}>
            {tituloFechar && <Pressable onPress={() => setMostrar(false)}>
               <HStack>
                  <Text color='azul' >{tituloFechar}</Text>
               </HStack>
            </Pressable>}
            {children}
         </VStack>
         <DiamontDown />
      </VStack>
   )
}
