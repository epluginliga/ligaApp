import React, { useEffect } from 'react'
import { Pressable, StatusBar } from 'react-native'

import { Layout } from '../../components/Views/Layout'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'

import { data } from '../../../store/eventoId';
import { Card } from '../../components/Card'
import HStack from '../../components/Views/Hstack'
import { Button } from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { ResumoPedido } from '../../components/ResumoPedido'
import { KEY_REDIRECT } from '../../hooks/auth'

export function Carrinho() {
   const { navigate } = useNavigation();

   useEffect(() => {
      async function removeUrlRedirect() {
         try {
           
         } catch (e) { }
         finally {
         }
      }
      removeUrlRedirect();
   }, [])

   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Root>
            <Layout.Header title='Ingressos disponíveis' />

            <Layout.Scroll>
               <VStack gap="lg">

                  <ResumoPedido data={data} />

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
