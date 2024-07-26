import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

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
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/default'

export function CheckoutSucesso() {
   const { navigate } = useNavigation();
   const { colors } = useTheme<Theme>();
   const { total, totalItens } = useCarrinho();

   return (
      <>
         <Layout.Header title='Sucesso' />
         <Layout.Scroll>

            <VStack gap='xl' justifyContent='space-between' flex={1} marginBottom='lg'>

               <VStack gap='sm'>
                  <Section.Root alignItems='center'>
                     <VStack backgroundColor='white' width={60} height={60} borderRadius={50} justifyContent='center' alignItems='center'>
                        <Icon.CheckCircle size={45} color={colors.greenDark} />
                     </VStack>
                     <Section.Title color='greenDark'>Pagamento Aprovado!</Section.Title>

                     <Section.SubTitle>
                        O ingresso, agora é seu, meus parabéns!
                     </Section.SubTitle>
                  </Section.Root>
               </VStack>

               <VStack flex={1} gap='md' >
                  <ResumoPedido />

                  <Card.Root title="Resumo" variant='border'>
                     <Text color='primary' variant='header'>{Maskara.dinheiro(total)}</Text>
                     <Card.Title variant='header'>{totalItens} ingresso</Card.Title>
                  </Card.Root>
               </VStack>

               <Button
                  onPress={() => navigate("IngressosTab")}
                  marginHorizontal="md">
                  Continuar
               </Button>

            </VStack>

         </Layout.Scroll>
      </>
   )
}
