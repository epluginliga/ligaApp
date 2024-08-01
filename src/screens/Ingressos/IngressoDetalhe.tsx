import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Section } from '../../components/Section';
import VStack from '../../components/Views/Vstack';
import { Layout } from '../../components/Views/Layout';
import { RouteApp } from '../../@types/navigation';

import Circle from '../../components/Views/Circle';
import Text from '../../components/Text';
import HStack from '../../components/Views/Hstack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchIngressoDetalhe } from '../../services/eventos';
import { Maskara } from '../../utils/Maskara';
import QRCode from 'react-native-qrcode-svg'
import { Card } from '../../components/Card';
import { Icon } from '../../icons';
import { dataApp } from '../../utils/utils';

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

   const textStyles = useAnimatedStyle(() => {
      if (scrollY.value < 0) { };
      const opacity = interpolate(scrollY.value, [0, 25], [0, 1], Extrapolation.CLAMP);
      return { opacity };
   });

   if (!data) return;

   const { dadosCompra, dadosUsuario } = data;

   const dataISO = dataApp().converteDataBRtoISO(dadosCompra.evento_data_evento)
   const dataEvento = dataApp(dataISO);

   return (
      <>
         <StatusBar barStyle={"dark-content"} />
         <Layout.Header title='Detalhes do evento' />
         <Animated.View style={[
            {
               backgroundColor: "white",
               position: "absolute",
               zIndex: 99,
               width: "100%"
            }, textStyles]}>
            <Layout.Header title={dadosCompra.evento_nome.slice(0, 18) + "..."} />
         </Animated.View>

         <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            automaticallyAdjustKeyboardInsets
            style={{ position: "relative" }}
         >
            <Card.Root
               mx="sm"
               mt='lg'
               pr="xs">
               <Card.Image
                  flex={1}
                  height={88}
                  source={{ uri: dadosCompra?.evento_path_imagem }} />

               <VStack flex={2} justifyContent='space-around' pb='sm'>
                  <Card.Title lineHeight={22.5} mt='sm'>{dadosCompra.evento_nome}</Card.Title>

                  <Card.SubTitle leftIcon={<Icon.Calendario size={16} />} >
                     {dataEvento.diaSemana()}, {'\n'}
                     {`${dataEvento.diaMes()} de ${dataEvento.nomeFullMes()}`}
                  </Card.SubTitle>

                  <Card.SubTitle leftIcon={<Icon.Pin size={16} />} >
                     <Card.Span>
                        {dadosCompra.evento_cidade} | {dadosCompra.evento_estado} - {dataEvento.hora() || 'hora não definida'}
                     </Card.Span>
                  </Card.SubTitle>

               </VStack>
            </Card.Root>

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
                     <Image source={{ uri: dadosCompra.usuario_path_avatar }} height={120} width={120} style={{
                        borderRadius: 100
                     }} />
                  </VStack>
                  <VStack p='sm' backgroundColor='white'>
                     <QRCode
                        size={160}
                        value={dadosCompra.bilhete_codigo_barra}
                     />
                  </VStack>
               </VStack>

               <HStack justifyContent='space-between' mt='xl'>
                  <Text variant='labelInput' color='black'>#{dadosCompra.bilhete_codigo_barra}</Text>
               </HStack>

            </LayoutTicket>

            <View style={{
               flex: 1,
               marginBottom: insets.bottom
            }} />

         </Animated.ScrollView>
      </>
   );
};

