import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import Text from '../../components/Text'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { ResumoPedido } from '../../components/ResumoPedido'
import { useCarrinho } from '../../hooks/carrinho'
import { Maskara } from '../../utils/Maskara'
import { TituloCardCupom } from './CarrinhoCupomDesconto'

export function CarrinhoResumo() {
   const { navigate } = useNavigation();
   const { total, totalItens, cupom } = useCarrinho();

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

            <Pressable onPress={() => navigate("CarrinhoCupomDesconto")}>
               <TituloCardCupom cupom={cupom} />
            </Pressable>

            <Button marginHorizontal="md" onPress={() => navigate("CheckoutEnderecoCobranca")}>
               Continuar
            </Button>

         </VStack>
      </Layout.Root>
   )
}
