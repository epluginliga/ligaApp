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
import { ActivityIndicator } from 'react-native'

export function CheckoutProcessandoPagamento() {
   const { navigate } = useNavigation();
   const { colors } = useTheme<Theme>();
   const { total, totalItens } = useCarrinho();
   return (
      <>
         <Layout.Header title='Sucesso' />


         <VStack gap='xl' justifyContent='center' flex={1} marginBottom='lg'>


            <Section.Root alignItems='center'>
               <VStack backgroundColor='white' width={60} height={60} borderRadius={50} justifyContent='center' alignItems='center'>
                  <ActivityIndicator color={colors.primary} />
               </VStack>
               <Section.Title color='primary' textAlign='center'>Ainda estamos processando seu pagamento</Section.Title>
               
            </Section.Root>

         </VStack>

      </>
   )
}
