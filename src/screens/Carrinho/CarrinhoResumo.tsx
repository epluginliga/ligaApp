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
import { useQuery } from '@tanstack/react-query'
import { obtemCarrinho } from '../../services/carrinho'
import { useCarrinho } from '../../hooks/carrinho'
import { Maskara } from '../../utils/Maskara'
import { CarrinhoCupomDesconto } from './CarrinhoCupomDesconto'

export function CarrinhoResumo() {
   const { navigate } = useNavigation();

   const { total, totalItens } = useCarrinho();
// console.log(JSON.stringify(totalItens, null, 1))

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

               <Card.Root title="Resumo" variant='border'>
                  <VStack>
                     <Text lineHeight={23} color='primary' variant='header'>{Maskara.dinheiro(total)}</Text>
                  </VStack>
                  <Card.Title variant='header'>{totalItens} ingresso</Card.Title>
               </Card.Root>
            </VStack>

            <CarrinhoCupomDesconto />

            <Button marginHorizontal="md" onPress={() => navigate("CheckoutEnderecoCobranca")}>
               Continuar
            </Button>

         </VStack>


      </Layout.Root>

   )
}
