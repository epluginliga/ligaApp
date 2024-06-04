import React from 'react'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'
import Text from '../../components/Text'
import { Card } from '../../components/Card'
import HStack from '../../components/Views/Hstack'
import { ModalApp } from '../../components/Modal'
import { Button } from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { ResumoPedido } from '../../components/ResumoPedido'

export function CarrinhoResumo() {
   const { navigate } = useNavigation();

   return (
      <Layout.Root>
         <Layout.Header title='Resumo do pedido' />

         <VStack
            gap="lg"
            marginBottom='md'
            justifyContent='space-between'
            flex={1}
         >
            <VStack flex={1} gap='md' >
               <ResumoPedido />

               <Card.Root title="Resumo do pedido" variant='border'>
                  <VStack>
                     <Text lineHeight={23} variant='header'>1 lote</Text>
                     <Text lineHeight={23} color='primary' variant='header'>R$ 60,00</Text>
                  </VStack>
                  <Card.Title variant='header'>1 unidade</Card.Title>
               </Card.Root>
            </VStack>

            <Section.Root>
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

            <Button marginHorizontal="md" onPress={() => navigate("CheckoutEnderecoCobranca")}>
               Continuar
            </Button>

         </VStack>


      </Layout.Root>

   )
}
