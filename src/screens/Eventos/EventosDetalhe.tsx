import React, { useState } from 'react';
import {
   ImageBackground,
   Platform,
   Pressable,
   SafeAreaView,
   StatusBar,
   View
} from 'react-native';

import Animated, {
   interpolate,
   useAnimatedScrollHandler,
   useAnimatedStyle,
   useSharedValue
} from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Section } from '../../components/Section';
import { Icon } from '../../icons';
import { formataData } from '../../utils/utils';
import VStack from '../../components/Views/Vstack';
import { Html } from '../../components/Html';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Views/Layout';
import { IconShare } from '../../icons/IconShare';
import { RouteApp } from '../../@types/navigation';

import Circle from '../../components/Views/Circle';
import { useAuth } from '../../hooks/auth';
import { fetchEventoDetalhe } from '../../services/eventos';
import { useCarrinho } from '../../hooks/carrinho';
import { deletaCarrinho, obtemCarrinho } from '../../services/carrinho';
import { EventosPayload } from '../../services/@eventos';
import { useTheme } from '@shopify/restyle';
import Text from '../../components/Text';
import HStack from '../../components/Views/Hstack';
import { Theme } from '../../theme/default';
import { EventosModalEmCompra } from './EventosModalEmCompra';


type ButtonComprarInfressosProps = {
   evento: EventosPayload
}
function ButtonComprarIngressos({ evento }: ButtonComprarInfressosProps) {
   const [mostraModal, setMostraModal] = useState(false);
   const { logado } = useAuth();
   const { adicionaEvento, limpaCarrinho } = useCarrinho();
   const { colors } = useTheme<Theme>()
   const { navigate } = useNavigation();

   const handleVerificaSeExisteCarrinho = useMutation({
      mutationFn: obtemCarrinho,
      onSuccess(data) {
         const mostrarModal = data.status === "em_compra";
         if (!mostrarModal) {
            adicionaEvento(evento);
            return navigate("Carrinho");
         }

         setMostraModal(mostrarModal);
      },
   });

   const cancelaCarrinho = useMutation({
      mutationFn: deletaCarrinho,
      onSuccess() {
         navigate('Carrinho');
      },
   });

   const { data } = handleVerificaSeExisteCarrinho;

   return (
      <>
         <EventosModalEmCompra ativo={mostraModal}>
            {data && (
               <>
                  <Text textAlign='center' color='azul'>
                     Você já tem um carrinho
                     <Text variant='header' >{'\n'} {data?.status_str}</Text>
                  </Text>

                  <VStack gap="md">
                     <Text textAlign='center' variant='header2'>O que Deseja fazer?</Text>

                     <HStack width="100%" paddingHorizontal='md' justifyContent='space-between'>
                        <Pressable onPress={() => {
                           setMostraModal(false);
                           limpaCarrinho();
                           adicionaEvento(evento);
                           cancelaCarrinho.mutate(data.id);
                        }}>
                           <HStack alignItems='center' backgroundColor='white' p='sm' borderRadius={10}>
                              <Text variant='botaoLink' color='primary'>Limpar, e continuar</Text>
                           </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                           setMostraModal(false);
                           navigate("CarrinhoUtilizador");
                        }}>
                           <HStack alignItems='center' backgroundColor='white' p='sm' borderRadius={10}>
                              <Text variant='botaoLink' color='greenDark'>Ir para o Carrinho</Text>
                              <Icon.ArrowRight size={18} color={colors.greenDark} />
                           </HStack>
                        </Pressable>
                     </HStack>
                  </VStack>
               </>
            )}
         </EventosModalEmCompra>

         <VStack
            position="absolute"
            justifyContent='center'
            width="100%"
            bottom={Platform.OS === "android" ? 10 : 30}
         >
            <Button
               loading={handleVerificaSeExisteCarrinho.isPending}
               marginHorizontal="md"
               onPress={() => {
                  if (logado) {
                     handleVerificaSeExisteCarrinho.mutate();
                     return;
                  }

                  adicionaEvento(evento);
                  return navigate("Login", {
                     redirect: "Carrinho",
                  });
               }}>
               Comprar
            </Button>
         </VStack>
      </>
   )
}

type EventoDetalheRouteProp = RouteProp<RouteApp, 'EventosDetalhe'>;

export const EventosDetalhe = () => {
   const { navigate } = useNavigation();

   const { params } = useRoute<EventoDetalheRouteProp>();
   const scrollY = useSharedValue(0);

   const { data: eventoDetalhe } = useQuery({
      queryKey: ['eventosDetalhe', params?.id],
      queryFn: () => fetchEventoDetalhe(params?.id),
      enabled: !!params?.id
   });

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
      },
   });

   const animatedStyles = useAnimatedStyle(() => {
      const height = interpolate(scrollY.value, [0, 0], [300, 250, 0], "clamp");
      const opacity = interpolate(scrollY.value, [0, 80], [1, 0], "clamp");

      return { opacity, height };
   });

   const textStyles = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [0, 100], [0, 1], 'clamp');
      return { opacity };
   });

   const shareStyles = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [1, 50], [1, 0], 'clamp');
      return { opacity };
   });

   if (!eventoDetalhe) {
      return (
         <VStack gap='md' flex={1}>
            <VStack backgroundColor='bege_200' height={300} />
            <View style={{ marginTop: -20 }} >
               <Section.Root position='relative' zIndex={9}>
                  <VStack width={200} height={10} borderRadius={20} backgroundColor='bege_200'></VStack>
                  <VStack width={100} height={10} borderRadius={20} backgroundColor='bege_200'></VStack>
                  <VStack width={240} height={10} borderRadius={20} backgroundColor='bege_200'></VStack>
               </Section.Root>
            </View>
         </VStack>
      );
   }

   return (
      <>
         <StatusBar barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"} />

         <Animated.View style={[
            {
               backgroundColor: "white",
               position: "absolute",
               zIndex: 99,
               width: "100%"
            }, textStyles]}>

            <SafeAreaView>
               <Layout.Header title={eventoDetalhe?.nome}
                  rigth={(
                     <Pressable onPress={() => console.log("pre")}>
                        <IconShare />
                     </Pressable>
                  )}
               />
            </SafeAreaView>
         </Animated.View>

         <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            automaticallyAdjustKeyboardInsets
            style={{ position: "relative" }}
            scrollToOverflowEnabled
         >
            <Animated.View
               renderToHardwareTextureAndroid
               style={[{ height: 300 }, animatedStyles]}>
               <ImageBackground
                  style={{ height: "100%", width: "100%" }}
                  source={{ uri: eventoDetalhe?.path_imagem }} >
                  <SafeAreaView>
                     <Layout.Header handleBack={() => navigate('Home')} />
                  </SafeAreaView>
               </ImageBackground>
            </Animated.View>

            <Animated.View style={[{ marginLeft: '85%', position: "absolute", top: 260, zIndex: 999 }, shareStyles]}>
               <Circle variant='shadow' borderColor='white' justifyContent='center' width={52} height={52}>
                  <Pressable onPress={() => console.log("pre")}>
                     <IconShare />
                  </Pressable>
               </Circle>
            </Animated.View>

            <View style={{ marginTop: -10 }} >
               <Section.Root position='relative' zIndex={9}>
                  <Section.SubTitle iconLeft={<Icon.Calendario />}>
                     {formataData(eventoDetalhe?.data_evento).diaMesAnoTexto()}
                  </Section.SubTitle>

                  <Section.SubTitle iconLeft={<Icon.Clock />}>
                     {formataData(eventoDetalhe?.data_evento).hora()}
                  </Section.SubTitle>

                  <VStack gap="xs" >
                     <Section.SubTitle iconLeft={<Icon.Pin />}>
                        {eventoDetalhe?.nome_local + '\n'}
                        <Section.Span>
                           {eventoDetalhe?.logradouro}
                        </Section.Span>
                     </Section.SubTitle>

                     <Html source={eventoDetalhe?.descricao} />

                     <View style={{ height: 180 }} />

                  </VStack>
               </Section.Root>
            </View>
         </Animated.ScrollView>

         <ButtonComprarIngressos evento={eventoDetalhe} />
      </>
   );
};


