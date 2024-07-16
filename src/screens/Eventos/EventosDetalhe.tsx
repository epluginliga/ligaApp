import React, { useState } from 'react';
import {
   ImageBackground,
   Platform,
   Pressable,
   StatusBar,
   View
} from 'react-native';

import Animated, {
   Extrapolation,
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
import theme, { Theme } from '../../theme/default';
import { EventosModalEmCompra } from './EventosModalEmCompra';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type ButtonComprarInfressosProps = {
   evento: EventosPayload
}
function ButtonComprarIngressos({ evento }: ButtonComprarInfressosProps) {
   const [mostraModal, setMostraModal] = useState(false);
   const { logado } = useAuth();
   const { adicionaEvento, limpaCarrinho, setCupom, total, adicionaIngressoAoEvento, setCarrinhoId } = useCarrinho();
   const { colors } = useTheme<Theme>()
   const { navigate } = useNavigation();

   const handleVerificaSeExisteCarrinho = useMutation({
      mutationFn: obtemCarrinho,
      mutationKey: ['EventoDetalheObtemCarrinho'],
      onSuccess(data) {
         const mostrarModal = data.status === "em_compra";
         if (!mostrarModal) {
            adicionaEvento(evento);
            return navigate("Carrinho");
         }

         if (data.cupom) {
            setCupom(data.cupom)
         }
         setMostraModal(mostrarModal);
      },
      onError() {
         limpaCarrinho();
         adicionaEvento(evento);
         setCarrinhoId('')
         navigate('Carrinho');
      },
   });

   const cancelaCarrinho = useMutation({
      mutationFn: deletaCarrinho,
      onSuccess() {
         limpaCarrinho();
         adicionaEvento(evento);
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
                           cancelaCarrinho.mutate(data.id);
                        }}>
                           <HStack alignItems='center' backgroundColor='white' p='sm' borderRadius={10}>
                              <Text variant='botaoLink' color='primary'>Limpar, e continuar</Text>
                           </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                           setMostraModal(false);
                           const ingresso = data.eventos.flatMap(ingresso => ingresso.ingressos);

                           if (total === 0) {
                              ingresso.forEach(ingr => {
                                 adicionaIngressoAoEvento({
                                    id: ingr.id,
                                    lote_id: ingr.lote_id,
                                    qtd: ingr.qtd,
                                    valor: ingr.valor
                                 })
                              })
                           }

                           const usuarioAtribuidos = ingresso.filter(usuario => usuario.dados_atribuir.length > 0)
                              .map(item => item.dados_atribuir)
                              .map(item => item.filter(user => user.cpf && user.nome))
                              .filter(item => item.length > 0);

                           if (usuarioAtribuidos.length > 0) {
                              return navigate("CarrinhoResumo");
                           }
                           return navigate("CarrinhoUtilizador");
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
   const insets = useSafeAreaInsets();
   const { params } = useRoute<EventoDetalheRouteProp>();
   const scrollY = useSharedValue(0);
   const { goBack } = useNavigation();

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
      if (scrollY.value < 0) { };
      const bottom = interpolate(scrollY.value, [0, 80], [0, -20], Extrapolation.EXTEND);
      const height = interpolate(scrollY.value, [0, 80], [400, 350], Extrapolation.EXTEND);
      const opacity = interpolate(scrollY.value, [1, 300], [1, 0], Extrapolation.EXTEND);

      return { bottom, height, opacity };
   });

   const textStyles = useAnimatedStyle(() => {
      if (scrollY.value < 0) { };
      const opacity = interpolate(scrollY.value, [0, 25], [0, 1], Extrapolation.CLAMP);
      return { opacity };
   });

   const shareStyles = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [1, 50], [1, 0], Extrapolation.CLAMP);
      return { opacity };
   });

   if (!eventoDetalhe) {
      return (
         <VStack gap='md' flex={1}>
            <VStack backgroundColor='bege_200' height={300} />
            <View style={{ marginTop: -30 }} >
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
         <StatusBar barStyle={"dark-content"} />

         <Animated.View style={[
            {
               backgroundColor: "white",
               position: "absolute",
               zIndex: 99,
               width: "100%"
            }, textStyles]}>
            <Layout.Header

               title={eventoDetalhe?.nome}
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
            style={{ position: "relative" }}
            maximumZoomScale={0}
            minimumZoomScale={0}
         >
            <View style={{ position: "relative", height: 400, width: "100%", zIndex: -9 }}>
               <Animated.Image
                  style={[{ position: "absolute", width: "100%", height: "100%" }, animatedStyles]}
                  source={{ uri: eventoDetalhe?.path_imagem }} />
            </View>

            <VStack position='absolute' paddingHorizontal='md'>
               <Pressable style={{ marginTop: insets.top }} onPress={goBack}>
                  <Icon.ArrowLeftCircle color={theme.colors.azul} />
               </Pressable>
            </VStack>

            <Animated.View style={[{ marginLeft: '85%', position: "absolute", top: 350, zIndex: 999 }, shareStyles]}>
               <Circle variant='shadow' borderColor='white' justifyContent='center' width={52} height={52}>
                  <Pressable onPress={() => console.log("pre")}>
                     <IconShare />
                  </Pressable>
               </Circle>
            </Animated.View>

            <View style={{ marginTop: -20 }} >
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
                  </VStack>
               </Section.Root>
            </View>


            <View style={{ marginBottom: insets.bottom + 60 }} />
         </Animated.ScrollView>

         <ButtonComprarIngressos evento={eventoDetalhe} />

      </>
   );
};


