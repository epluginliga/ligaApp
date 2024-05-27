import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { StepContext } from '.'

export function IngressosDisponivel() {
   const { next, prev } = useContext(StepContext);

   return (
      <Layout.Root>
         <Layout.Header title='Meus Eventos' />
         <VStack backgroundColor='buttonPrimaryBackground' flex={1}>
            <Pressable onPress={() => prev()}>
               <Text> Voltar </Text>
            </Pressable>
         </VStack>
      </Layout.Root>
   )
}
