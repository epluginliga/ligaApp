import React, { useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { Section } from '../../components/Section'
import Text from '../../components/Text'
import { Button } from '../../components/Button'
import { ResumoPedido } from '../../components/ResumoPedido'
import Temporizador from '../../components/Temporizador'

import { Icon } from '../../icons'
import { useCheckout } from '../../hooks/checkout';
import { useCarrinho } from '../../hooks/carrinho';
import { carrinhoStatusPagamento, CarrinhoStatusPagamentoPayload } from '../../services/carrinho';
import { useAuth } from '../../hooks/auth';
import { TEMPO_PIX } from '@env';

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

type CodigoPixProps = {
   uri: string;
   codigo: string;
}

function cancelaCarrinhoStatusPagamento(data?: CarrinhoStatusPagamentoPayload) {
   if (!data) {
      return false;
   }

   if (data?.carrinho.status === "comprado" || data?.carrinho.status === "cancelado") {
      return false;
   }
   return 1000;
}

function CodigoPix({ uri, codigo }: CodigoPixProps) {
   const { carrinhoId } = useCarrinho();
   const { token } = useAuth();
   const { navigate } = useNavigation();

   const { data } = useQuery({
      queryFn: () => carrinhoStatusPagamento(carrinhoId, token),
      queryKey: ['carrinhoStatusPagamento'],
      refetchInterval: data => cancelaCarrinhoStatusPagamento(data?.state?.data)
   });

   if (data?.carrinho?.status === "comprado") {
      navigate("CheckoutSucesso", {
         codigo: "200",
         mensagem: "Pagamento Aprovado!"
      });
   };

   return (
      <>
         <Image
            height={185}
            width={185}
            source={{ uri }}
         />
         <BotaoCopiarCodigoPix codigo={codigo} />
      </>
   )
}

export function CheckoutPix() {
   const insets = useSafeAreaInsets();
   const { codigoPagamento } = useCheckout();
   const { navigate } = useNavigation();

   return (
      <>
         <Layout.Header title='Checkout' handleBack={() => navigate("CheckoutPagamento")} />
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
                        Pague o seu PIX dentro de <Temporizador tempo={TEMPO_PIX} /> e garanta a efetivação de sua compra.
                     </Text>

                     <Section.Title>PIX COPIA E COLA</Section.Title>

                     {codigoPagamento.url_view ? (
                        <CodigoPix codigo={codigoPagamento.codigo} uri={codigoPagamento.url_view} />
                     ) : (
                        <VStack
                           backgroundColor='white'
                           height={150}
                           width={150}
                           borderRadius={10}
                           justifyContent='center'
                           alignItems='center'
                        >
                           <Icon.X size={80} />
                        </VStack>
                     )}

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
