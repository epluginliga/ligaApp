import React, { useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Image, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { Section } from '../../components/Section'
import Text from '../../components/Text'
import { Button } from '../../components/Button'
import { ResumoPedido } from '../../components/ResumoPedido'
import Temporizador from '../../components/Temporizador'

import { RouteApp } from '../../@types/navigation'
import { Icon } from '../../icons'

type CheckoutPixRouteProp = RouteProp<RouteApp, 'CheckoutPix'>;

function BotaoCopiarCodigoPix({ codigo }: { codigo: string }) {
   const [codigoCopiado, setCodigoCopiado] = useState('');

   if (codigoCopiado) {
      return (
         <Button
            variant='sucesso'
            onPress={() => {
               setCodigoCopiado(codigo)
               Clipboard.setString(codigo);
            }}
            iconRight={<Icon.CheckCircle color='#fff' />}>Código copiado
         </Button>
      )
   }

   return (
      <Button
         onPress={() => {
            setCodigoCopiado(codigo)
            Clipboard.setString(codigo);
         }}
         iconRight={<Icon.Copy color='#fff' />}>COPIAR
      </Button>
   )
}

export function CheckoutPix() {
   const { navigate } = useNavigation();
   const insets = useSafeAreaInsets();
   const { params } = useRoute<CheckoutPixRouteProp>();

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
                        Pague o seu PIX dentro de <Temporizador /> e garanta a efetivação de sua compra.
                     </Text>

                     <Section.Title>PIX COPIA E COLA</Section.Title>

                     <Image
                        height={185}
                        width={185}
                        source={{ uri: params.url_view }}
                     />

                     <BotaoCopiarCodigoPix codigo={params.codigo} />

                  </Section.Root>

               </VStack>

               <VStack gap='md'>
                  <Text variant='header' marginLeft='md'>Resumo do pedido</Text>

                  <ResumoPedido />


               </VStack>
            </VStack>

            <View style={{ height: insets.bottom }} />

         </Layout.Scroll>
      </>

   )
}
