import React from 'react'
import { Pressable, StatusBar } from 'react-native'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import { formataData } from '../../utils/utils'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'

import { data } from '../../../store/eventoId';
import { Card } from '../../components/Card'
import HStack from '../../components/Views/Hstack'
import { Button } from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

export function Carrinho() {
   const { navigate } = useNavigation();

   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Root>
            <Layout.Header title='Ingressos disponíveis' />

            <Layout.Scroll>
               <VStack gap="lg">

                  <Section.Root>
                     <Section.Title>{data.nome}</Section.Title>

                     <Section.SubTitle iconLeft={<Icon.Calendario />}>
                        {formataData(data.data_evento).DiaMesAnoTexto()}
                     </Section.SubTitle>

                     <Section.SubTitle iconLeft={<Icon.Clock />}>
                        {formataData(data.data_evento).hora()}
                     </Section.SubTitle>

                     <VStack gap="xs">
                        <Section.SubTitle iconLeft={<Icon.Pin />}>
                           {data.nome_local + '\n'}
                           <Section.Span>
                              {data.logradouro}
                           </Section.Span>
                        </Section.SubTitle>
                     </VStack>
                  </Section.Root>

                  <Card.Root variant='border'>
                     <Card.Title>1 lote</Card.Title>
                     <Card.Title variant='labelInput'>R$ 50,00</Card.Title>
                     <Card.Title variant='labelInput'>Esgotado</Card.Title>
                  </Card.Root>

                  <Card.Root variant='border'>
                     <Card.Title>1 lote</Card.Title>
                     <Card.Title variant='labelInput'>R$ 50,00</Card.Title>
                     <HStack alignItems='center' gap="lg">
                        <Pressable>
                           <Icon.Minus />
                        </Pressable>
                        <Card.Title variant='header'>1</Card.Title>
                        <Pressable>
                           <Icon.Plus />
                        </Pressable>
                     </HStack>
                  </Card.Root>
               </VStack>
            </Layout.Scroll>

            <VStack justifyContent='center' width="100%" bottom={10}>
               <Button marginHorizontal="md" onPress={() => navigate('CarrinhoUtilizador')}>Continuar</Button>
            </VStack>
         </Layout.Root>
      </>
   )
}
