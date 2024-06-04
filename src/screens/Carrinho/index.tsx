import React from 'react'
import { Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'

import { Layout } from '../../components/Views/Layout'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'

import { Card } from '../../components/Card'
import HStack from '../../components/Views/Hstack'
import { Button } from '../../components/Button'
import { ResumoPedido } from '../../components/ResumoPedido'
import { vendaAplicativo } from '../../utils/constantes'
import { useCarrinho } from '../../hooks/carrinho'
import { fetchIngressoDisponivel } from '../../services/eventos'
import { ListEmptyComponent } from '../../components/ListEmptyComponent'

export function Carrinho() {
   const { navigate } = useNavigation();
   const { evento } = useCarrinho();

   if (!evento) return null;

   const { data, isLoading } = useQuery({
      queryKey: ['fetchIngressoDisponivel', evento?.id,],
      queryFn: () => fetchIngressoDisponivel({ evento_id: evento.id, pontoVenda: vendaAplicativo }),
      enabled: !!evento?.id,

   });

   if (!data?.length && !isLoading) {
      return (
         <Layout.Root>
            <Layout.Header title='Ingressos disponíveis' />
            <ResumoPedido />

            <ListEmptyComponent title='Nenhum ingresso disponível!' />
         </Layout.Root>
      )
   };

   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Root>
            <Layout.Header title='Ingressos disponíveis' />

            <Layout.Scroll>
               <VStack gap="lg">

                  <ResumoPedido />

                  {(data ?? []).map?.(data => {
                     return data?.ingressos?.map(ingresso => {
                        if (ingresso?.quantidade_disponivel_ingresso > 0) {
                           return (
                              <Card.Root key={ingresso.id} variant='border'>
                                 <Card.Title>1 lote</Card.Title>
                                 <Card.Title variant='labelInput'>R$ 50,00</Card.Title>
                                 <HStack alignItems='center' gap="lg">
                                    <Pressable
                                       disabled={!!ingresso.permitir_compra}
                                    >
                                       <Icon.Minus />
                                    </Pressable>

                                    <Card.Title variant='header'>1</Card.Title>

                                    <Pressable
                                       disabled={!!ingresso.permitir_compra}
                                    >
                                       <Icon.Plus />
                                    </Pressable>
                                 </HStack>
                              </Card.Root>
                           )
                        }

                        return (
                           <Card.Root key={ingresso.id} variant='border'>
                              <Card.Title>{ingresso.nome}</Card.Title>
                              <Card.Title variant='labelInput'>
                                 {ingresso.valor}
                              </Card.Title>
                              <Card.Title variant='labelInput'>Esgotado</Card.Title>
                           </Card.Root>
                        )
                     })
                  })}

               </VStack>
            </Layout.Scroll>

            <VStack justifyContent='center' width="100%" bottom={10}>
               <Button marginHorizontal="md" onPress={() => navigate('CarrinhoUtilizador')}>
                  Continuar
               </Button>
            </VStack>
         </Layout.Root>
      </>
   )
}
