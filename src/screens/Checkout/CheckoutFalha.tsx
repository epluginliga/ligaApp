import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { Section } from '../../components/Section'
import { Icon } from '../../icons'
import Text from '../../components/Text'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { ResumoPedido } from '../../components/ResumoPedido'
import { Maskara } from '../../utils/Maskara'
import { useCarrinho } from '../../hooks/carrinho'
import { RouteApp } from '../../@types/navigation'

type EventoDetalheRouteProp = RouteProp<RouteApp, 'CheckoutFalha'>;

export function CheckoutFalha() {
   const navigate = useNavigation();
   const { total, totalItens } = useCarrinho();
   const { params } = useRoute<EventoDetalheRouteProp>();

   return (
      <>
         <Layout.Header title='Pagamento com Erro' />
         <Layout.Scroll>

            <VStack gap='xl' justifyContent='space-between' flex={1} marginBottom='lg'>

               <VStack gap='sm'>
                  <Section.Root alignItems='center'>
                     <VStack backgroundColor='white' width={60} height={60} borderRadius={50} justifyContent='center' alignItems='center'>
                        <Icon.X size={45} />
                     </VStack>
                     <Section.Title color='primary' textAlign='center'>Houve um problema com o pagamento</Section.Title>

                     <VStack backgroundColor='white' p='xs' px='md' borderRadius={20}>
                        <Text fontWeight="bold" fontSize={18} textAlign='center'>{params.codigo}: {params.mensagem}</Text>
                     </VStack>
                  </Section.Root>
               </VStack>

               <VStack flex={1} gap='md'>
                  <ResumoPedido />

                  <Card.Root title="Resumo" variant='border'>
                     <Text color='primary' variant='header'>{Maskara.dinheiro(total)}</Text>
                     <Card.Title variant='header'>{totalItens} ingresso</Card.Title>
                  </Card.Root>
               </VStack>

               <Button
                  onPress={() => {
                     if (params.codigo === "403" || params.codigo === "500") {
                        return navigate.navigate("Home");
                     }

                     return navigate.goBack();
                  }}
                  marginHorizontal="md"
                  iconRight={false}
                  iconLeft={<Icon.ArrowLeft color='#fff' />}>
                  Voltar
               </Button>

            </VStack>

         </Layout.Scroll>
      </>
   )
}
