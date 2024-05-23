import React from 'react'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import { formataData } from '../../utils/utils'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'
import { data } from '../../../store/eventoId';
import Text from '../../components/Text'
import { Card } from '../../components/Card'
import HStack from '../../components/Views/Hstack'
import { ModalApp } from '../../components/Modal'
import { Button } from '../../components/Button'

export function CarrinhoResumo() {
   return (
      <Layout.Root>
         <Layout.Keyboard>
            <Layout.Header title='Resumo do pedido' />

            <VStack
               gap="lg"
               m='sm'
               marginBottom='md'
               justifyContent='space-between'
               flex={1}
            >
               <VStack flex={1} gap='md' marginHorizontal='md'>
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

                  <VStack>
                     <Text variant='header'>Resumo do pedido</Text>
                     <Card.Root variant='border'>
                        <VStack>
                           <Text lineHeight={23} variant='header'>1 lote</Text>
                           <Text lineHeight={23} color='primary' variant='header'>R$ 60,00</Text>
                        </VStack>
                        <Card.Title variant='header'>1 unidade</Card.Title>
                     </Card.Root>
                  </VStack>
               </VStack>

               <Section.Root >
                  <ModalApp handleOpen={(
                     <HStack alignItems='center'>
                        <Icon.Ticket />
                        <Section.Title>Cupom de Desconto?</Section.Title>
                     </HStack>
                  )}>
                     <VStack></VStack>
                  </ModalApp>

                  <VStack>
                     <Section.SubTitle>Total em ingressos: R$ 60,00</Section.SubTitle>
                     <Section.SubTitle>Total em taxas: R$ 6,00</Section.SubTitle>
                  </VStack>

               </Section.Root>

               <Button marginHorizontal="md">Continuar</Button>

            </VStack>

         </Layout.Keyboard>

      </Layout.Root>

   )
}
