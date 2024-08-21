import React from 'react';
import {
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
import { useQuery } from '@tanstack/react-query';

import { Section } from '../../components/Section';
import { Icon } from '../../icons';
import { dataApp } from '../../utils/utils';
import VStack from '../../components/Views/Vstack';
import { Html } from '../../components/Html';
import { Layout } from '../../components/Views/Layout';
import { RouteApp } from '../../@types/navigation';

import Circle from '../../components/Views/Circle';

import { fetchEventoDetalhe } from '../../services/eventos';
import theme from '../../theme/default';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonShare } from '../../components/ButtonShare';
import { ButtonComprarIngressos } from './EventosDetalheVerificaCarrinho';

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
      const height = interpolate(scrollY.value, [0, 80], [250, 180], Extrapolation.EXTEND);
      return { bottom, height };
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
                  <ButtonShare url={eventoDetalhe.url_visualizacao} />
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
            <View style={{ position: "relative", height: 250, width: "100%", zIndex: -9 }}>
               <Animated.Image
                  style={[{ position: "absolute", width: "100%", height: "100%" }, animatedStyles]}
                  source={{ uri: eventoDetalhe?.path_imagem }} />
            </View>

            <VStack position='absolute' paddingHorizontal='md'>
               <Pressable style={{ marginTop: Platform.OS === "android" ? 10 : insets.top }} onPress={goBack}>
                  <Icon.ArrowLeftCircle color={theme.colors.azul} />
               </Pressable>
            </VStack>

            <Animated.View style={[{ marginLeft: '85%', position: "absolute", top: 200, zIndex: 999 }, shareStyles]}>
               <Circle variant='shadow' borderColor='white' justifyContent='center' width={52} height={52}>
                  <ButtonShare url={eventoDetalhe.url_visualizacao} />
               </Circle>
            </Animated.View>

            <View style={{ marginTop: -20 }} >
               <Section.Root position='relative' zIndex={9}>
                  <Section.SubTitle iconLeft={<Icon.Calendario />}>
                     {dataApp(eventoDetalhe?.data_evento).diaMesAnoTexto()}
                  </Section.SubTitle>

                  <Section.SubTitle iconLeft={<Icon.Clock />}>
                     {dataApp(eventoDetalhe?.data_evento).hora()}
                  </Section.SubTitle>

                  <VStack gap="xs" >
                     <Section.SubTitle iconLeft={<Icon.Pin />}>
                        {eventoDetalhe?.nome_local + '\n'}
                        <Section.Span>
                           {eventoDetalhe?.logradouro}
                        </Section.Span>
                     </Section.SubTitle>

                     <Html source={eventoDetalhe?.descricao || ''} />
                  </VStack>
               </Section.Root>
            </View>

            <View style={{ marginBottom: insets.bottom + 80 }} />
         </Animated.ScrollView>

         <ButtonComprarIngressos evento={eventoDetalhe} />
      </>
   );
};


