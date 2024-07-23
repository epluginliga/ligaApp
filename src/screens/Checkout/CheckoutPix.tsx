import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { Section } from '../../components/Section'
import { Icon } from '../../icons'
import Text from '../../components/Text'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { ResumoPedido } from '../../components/ResumoPedido'
import { ActivityIndicator } from 'react-native'
import { dataApp } from '../../utils/utils'

export function CheckoutPix() {
   const { navigate } = useNavigation();
   const [time, setTime] = useState(20)



   return (
      <>
         <Layout.Header title='Checkout' />
         <Layout.Scroll>

            <VStack gap='xl' justifyContent='space-between' flex={1} marginBottom='lg'>

               <VStack gap='sm'>
                  <Section.Root >
                     <Section.Title>Estamos quase lá</Section.Title>

                     <Section.SubTitle iconLeft={<ActivityIndicator size="small" />}>
                        Seu pedido foi realizado, mas ainda estamos aguardando a confirmação do seu pagamento!
                     </Section.SubTitle>
                  </Section.Root>

                  <Section.Root alignItems='center'>
                     <Text textAlign='center'>
                        Pague o seu PIX dentro de <Text fontWeight="bold">d</Text> e garanta a efetivação de sua compra.
                     </Text>
                     <Section.Title>PIX COPIA E COLA</Section.Title>
                     <Button iconRight={<Icon.Copy color='#fff' />}>COPIAR</Button>
                  </Section.Root>
               </VStack>

               <VStack gap='md'>
                  <Text variant='header' marginLeft='md'>Resumo do pedido</Text>

                  <ResumoPedido />

                  <Card.Root variant='border'>
                     <VStack p='md'>
                        <Text lineHeight={23} variant='header'>1 lote</Text>
                        <Text lineHeight={23} color='primary' variant='header'>R$ 60,00</Text>
                        <Card.SubTitle lineHeight={18} color='primary'>R$ 6 real taxas</Card.SubTitle>
                     </VStack>
                     <Card.Title variant='header'>1 unidade</Card.Title>
                  </Card.Root>
               </VStack>
            </VStack>

         </Layout.Scroll>
      </>

   )
}
