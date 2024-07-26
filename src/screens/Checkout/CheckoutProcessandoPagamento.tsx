import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import VStack from '../../components/Views/Vstack'
import { Section } from '../../components/Section'
import Text from '../../components/Text'

import { useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import { ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import { useQuery } from '@tanstack/react-query'
import { carrinhoStatusPagamento, CarrinhoStatusPagamentoPayload } from '../../services/carrinho'
import { useCarrinho } from '../../hooks/carrinho'
import { useAuth } from '../../hooks/auth'
import { useCheckout } from '../../hooks/checkout'

const frases = [
   "Enviando requisicão..",
   "Processando pagamento..",
   "Esperando resposta...",
   "Ainda processando, aguarde mais um pouco...",
   "Finalizando.."
];


export function CheckoutProcessandoPagamento() {
   const { navigate } = useNavigation();
   const { colors } = useTheme<Theme>();
   const [time, setTime] = useState(0);
   const { carrinhoId } = useCarrinho();
   const { updateStatus } = useCheckout();
   const { token } = useAuth();

   const widthScreen = Dimensions.get("screen").width;
   const partes = (widthScreen / frases.length) - 10;
   const width = useSharedValue(10);

   function cancelaCarrinhoStatusPagamento(data?: CarrinhoStatusPagamentoPayload) {
      if (!data) {
         return false;
      }

      if (time === frases.length) {
         return false;
      }

      if (data?.carrinho.status === "comprado" || data?.carrinho.status === "cancelado") {
         return false;
      }

      return 10000;
   }

   const { data, isFetching, refetch } = useQuery({
      queryFn: () => carrinhoStatusPagamento(carrinhoId, token),
      queryKey: ['CartaocarrinhoStatusPagamento'],
      refetchInterval: data => cancelaCarrinhoStatusPagamento(data?.state?.data),
   });

   useFocusEffect(
      useCallback(() => {
         refetch()
      }, [refetch])
   )

   console.log(data?.carrinho.status, isFetching)

   useEffect(() => {
      const timer = setInterval(() => {
         setTime((prevTime) => {
            if (prevTime == frases.length) {
               return prevTime;
            };

            const currtime = prevTime + 1;

            if (width.value < widthScreen) {
               width.value = withSpring(width.value + partes, {
                  damping: 100,
               });
            }

            return currtime;
         });

      }, 4000);

      return () => clearInterval(timer);

   }, []);

   if (data?.carrinho?.status === "comprado") {
      navigate("CheckoutSucesso", {
         codigo: "200",
         mensagem: "Pagamento Aprovado!"
      });
      return () => { }
   };

   if (time == frases.length) {
      navigate("CheckoutFalha", {
         codigo: "418",
         mensagem: "Tempo expirado!"
      });
      return () => { }
   };

   return (
      <>
         <StatusBar hidden />

         <VStack gap='xl' justifyContent='center' flex={1} backgroundColor='cardPrimaryBackground'>
            <Section.Root >
               <VStack alignSelf='center' backgroundColor='white' width={60} height={60} borderRadius={50} justifyContent='center' alignItems='center'>
                  <ActivityIndicator color={colors.primary} />
               </VStack>
               <Section.Title color='primary' textAlign='center'>
                  Aguarde
               </Section.Title>

               <Text textAlign='center'>{frases[time]}</Text>

               <VStack
                  backgroundColor='white'
                  borderRadius={100}

               >
                  <Animated.View
                     style={{
                        width,
                        height: 8,
                        backgroundColor: colors.greenDark,
                        borderRadius: 100,
                     }}
                  />
               </VStack>

            </Section.Root>
         </VStack>
      </>
   )
}

