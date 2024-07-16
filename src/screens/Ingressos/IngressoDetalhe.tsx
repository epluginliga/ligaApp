import React from 'react';
import { Image, ImageBackground, Pressable, StatusBar } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Section } from '../../components/Section';
import VStack from '../../components/Views/Vstack';
import { Layout } from '../../components/Views/Layout';
import { IconShare } from '../../icons/IconShare';
import { RouteApp } from '../../@types/navigation';

import Circle from '../../components/Views/Circle';
import Text from '../../components/Text';
import HStack from '../../components/Views/Hstack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchIngressoDetalhe } from '../../services/eventos';
import { Maskara } from '../../utils/Maskara';

type EventoDetalheRouteProp = RouteProp<RouteApp, 'IngressosDetalhe'>;

function LayoutTicket({ children }: { children: React.ReactNode }) {
   return (
      <VStack marginHorizontal='md'
         marginVertical='lg'
         p='lg'
         position='relative'
         backgroundColor='purple_100'
         flex={1}
         gap='md'
      >
         <Circle width={20} position='absolute' top={-8} left={-8} height={20} />
         <Circle width={20} position='absolute' right={-8} top={-8} height={20} />
         {children}

         <Circle width={20} position='absolute' bottom={-8} left={-8} height={20} />
         <Circle width={20} position='absolute' right={-8} bottom={-8} height={20} />

      </VStack>
   )
}

const enumeradoresPagaemnto: { [key: string]: string } = {
   'pix': 'PIX',
   'cartao_credito': 'Cartão de Crédito',
   'cartao_debito': 'Cartão de Débito',
   'dinheiro': 'Dinheiro',
   'boleto': 'Boleto',
   'default': 'Default',
   "pagamento_manual": 'Pagamento Manual'
}

export const IngressoDetalhe = () => {
   const insets = useSafeAreaInsets();
   const { params } = useRoute<EventoDetalheRouteProp>();
   const scrollY = useSharedValue(0);

   const { data } = useQuery({
      queryKey: ['IngressoEventosDetalhe', params],
      queryFn: () => fetchIngressoDetalhe(params),
      enabled: !!params
   });

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
      },
   });

   const animatedStyles = useAnimatedStyle(() => {
      if (scrollY.value < 0) { };
      const height = interpolate(scrollY.value, [0, 80], [250, 200], Extrapolation.EXTEND);
      const opacity = interpolate(scrollY.value, [1, 300], [1, 0], Extrapolation.EXTEND);

      return { height, opacity };
   });

   const textStyles = useAnimatedStyle(() => {
      if (scrollY.value < 0) { };
      const opacity = interpolate(scrollY.value, [0, 25], [0, 1], Extrapolation.CLAMP);
      return { opacity };
   });

   if (!data) return;

   const { dadosCompra, dadosUsuario } = data;

   return (
      <>
         <StatusBar barStyle={"dark-content"} />

         <Animated.View style={[
            {
               backgroundColor: "white",
               position: "absolute",
               zIndex: 99,
               width: "100%"
            }, textStyles]}>
            <Layout.Header title="Detalhe do ingresso"
               rigth={(
                  <Pressable onPress={() => console.log("pre")}>
                     <IconShare />
                  </Pressable>
               )}
            />
         </Animated.View>

         <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            automaticallyAdjustKeyboardInsets
            style={{ position: "relative" }}
         >
            <Animated.View
               renderToHardwareTextureAndroid
               style={[{ height: 300 }, animatedStyles]}>
               <ImageBackground
                  style={{ height: "100%", width: "100%" }}
                  source={{ uri: dadosCompra.evento_path_imagem }} >
                  <Layout.Header />
               </ImageBackground>
            </Animated.View>

            <LayoutTicket>

               <Section.Title>{dadosCompra.ingresso_nome}</Section.Title>

               <VStack
                  p='sm'
                  borderRadius={8}
                  gap='sm'>
                  <HStack>
                     <Text variant='header2'>{dadosUsuario.documento_tipo}</Text>
                     <Text variant='header3'>{dadosUsuario.documento_numero}</Text>
                  </HStack>
                  <HStack>
                     <Text variant='header2'>Utilizador</Text>
                     <Text variant='header3'>{dadosUsuario.name}</Text>
                  </HStack>
                  <HStack>
                     <Text variant='header2'>Pagamento</Text>
                     <Text variant='header3'>{enumeradoresPagaemnto[dadosCompra.bilhete_tipo_pagamento]}</Text>
                  </HStack>
                  <HStack>
                     <Text variant='header2'>Valor</Text>
                     <Text variant='header3'>{Maskara.dinheiro(dadosCompra.bilhete_valor_pago)}</Text>
                  </HStack>
               </VStack>

               <VStack alignItems='center' gap='md'>
                  <VStack backgroundColor='white' p='sm' borderRadius={100} overflow='hidden'>
                     <Image source={{ uri: dadosCompra.usuario_path_avatar }} height={140} width={140} style={{
                        borderRadius: 100
                     }} />
                  </VStack>
                  <Image source={require('../../../assets/imagem/qrcode.png')} />
               </VStack>

               <HStack justifyContent='space-between' mt='xl'>
                  <Text variant='labelInput' color='black'>#codigobilhete</Text>
                  {/* <Text variant='labelInput' color='black'>#{dadosCompra.usuario_path_avatar}</Text> */}
               </HStack>


            </LayoutTicket>

         </Animated.ScrollView>
      </>
   );
};

