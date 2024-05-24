import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import Text from '../../components/Text'
import { Section } from '../../components/Section'
import { Card } from '../../components/Card'
import Circle from '../../components/Views/Circle'
import VStack from '../../components/Views/Vstack'
import { Button } from '../../components/Button'
import { Icon } from '../../icons'

export function CheckoutPagamento() {
   const { navigate } = useNavigation();
   return (
      <Layout.Root>
         <Layout.Header title='Checkout' />
         <VStack justifyContent='space-between' flex={1}>

            <Section.Root >
               <Section.Title>Método de pagamento</Section.Title>

               <Section.SubTitle iconLeft={<Icon.Warning />}>
                  <Text fontSize={14} fontWeight="bold">Atenção</Text>, você só garante seus ingressos após a conclusão da compra.
               </Section.SubTitle>

               <Card.Root paddingHorizontal='none' variant='border'>
                  <Icon.CredtCard size={30} />
                  <Card.Title>Cartão de crédito</Card.Title>
                  <Circle width={20} height={20} variant='shadow' />
               </Card.Root>

               <Card.Root paddingHorizontal='none' variant='border'>
                  <Icon.Pix size={30} />
                  <Card.Title>PIX</Card.Title>
                  <Circle width={20} height={20} variant='shadow' />
               </Card.Root>

            </Section.Root>

            <Section.Root variant='shadow' mb='md'>
               <Section.Title >Total do pedido</Section.Title>

               <VStack>
                  <Section.SubTitle iconLeft={<Icon.Ticket size={18} />}>Total em ingressos: R$ 60,00</Section.SubTitle>
                  <Section.SubTitle iconLeft={<Icon.CheckCircle size={18} />}>Total em taxas: R$ 6,00</Section.SubTitle>
               </VStack>

               <Button onPress={() => navigate('CheckoutPix')}
                  marginHorizontal="md">
                  Continuar
               </Button>
            </Section.Root>
         </VStack>

      </Layout.Root>
   )
}
