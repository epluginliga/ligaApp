import React, { useEffect } from 'react'
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
import { useQuery } from '@tanstack/react-query'
import { obtemCarrinho } from '../../services/carrinho'

export function CarrinhoResumo() {
   const { navigate } = useNavigation();
   const { total, totalItens, cupom, setCarrinhoId, setCupom } = useCarrinho();

   useQuery({
      queryKey: ['obtemCarrinhoPaginaCarrinho'],
      queryFn: async () => {
         const carrinho = await obtemCarrinho();
         if (carrinho.id) {
            setCarrinhoId(carrinho?.id);
            if (carrinho?.cupom) {
               setCupom(carrinho.cupom)
            }
         }
         return carrinho;
      },
      refetchOnWindowFocus: true,
   },);

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
                  <Text color='primary' variant='header'>{Maskara.dinheiro(total)}</Text>
                  <Card.Title variant='header'>{totalItens} ingresso</Card.Title>
               </Card.Root>
            </VStack>

            <Pressable onPress={() => navigate("CarrinhoCupomDesconto")}>
               <TituloCardCupom cupom={cupom} />
            </Pressable>
         </VStack>

         <Button marginHorizontal="md" onPress={() => navigate("CheckoutPagamento")}>
            Continuar
         </Button>

      </Layout.Root>
   )
}
