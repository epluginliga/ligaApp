import React from 'react';
import { ImageBackground, Platform, Pressable, SafeAreaView, View } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Section } from '../../components/Section';
import { Icon } from '../../icons';
import { formataData } from '../../utils/utils';
import VStack from '../../components/Views/Vstack';
import { Html } from '../../components/Html';
import { Button } from '../../components/Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Layout } from '../../components/Views/Layout';
import { IconShare } from '../../icons/IconShare';
import { RouteApp } from '../../@types/navigation';

import { data as eventoDetalhe } from '../../../store/eventoId';
type EventoDetalheRouteProp = RouteProp<RouteApp, 'EventosDetalhe'>;


export const EventosDetalhe = () => {
   const { navigate } = useNavigation();
   const { params } = useRoute<EventoDetalheRouteProp>();
   console.log(params.id);

   const scrollY = useSharedValue(0);

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
      },
   });

   // const animatedStyles = useAnimatedStyle(() => {
   //    return {
   //       opacity: scrollY.value / 100,
   //       // transform: [{ scale: Math.max(1 - scrollY.value / 800, 0.5) }],
   //    };
   // });

   const animatedStyles = useAnimatedStyle(() => {
      const height = interpolate(scrollY.value, [0, 200], [200, 200], "clamp");
      const opacity = interpolate(scrollY.value, [0, 80], [1, 0], "clamp");
      const transform = [{ scale: Math.max(1 - scrollY.value / 800, 0.5) }];
      return { height, opacity, transform };
   });


   const textStyles = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [0, 50], [0, 1], 'clamp');
      return { opacity };
   });

   return (
      <>
         <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            style={{ position: "relative" }}
         >
            <Animated.View
               renderToHardwareTextureAndroid
               style={[animatedStyles]}>
               <ImageBackground style={{ height: "100%", paddingHorizontal: 10 }} source={{ uri: eventoDetalhe.path_imagem }} >
                  <SafeAreaView>
                     <Layout.Header rigth={(
                        <Pressable>
                           <IconShare />
                        </Pressable>
                     )} />

                  </SafeAreaView>
               </ImageBackground>
            </Animated.View>

            <Section.Root>
               <Section.Title>{eventoDetalhe.nome}</Section.Title>

               <Section.SubTitle iconLeft={<Icon.Calendario />}>
                  {formataData(eventoDetalhe.data_evento).DiaMesAnoTexto()}
               </Section.SubTitle>

               <Section.SubTitle iconLeft={<Icon.Clock />}>
                  {formataData(eventoDetalhe.data_evento).hora()}
               </Section.SubTitle>

               <VStack gap="xs" >
                  <Section.SubTitle iconLeft={<Icon.Pin />}>
                     {eventoDetalhe.nome_local + '\n'}
                     <Section.Span>
                        {eventoDetalhe.logradouro}
                     </Section.Span>
                  </Section.SubTitle>

                  <Html source={eventoDetalhe.descricao} />

               </VStack>
               <View style={{ marginBottom: 100 }} />
            </Section.Root>
         </Animated.ScrollView>

         <VStack position="absolute" justifyContent='center' width="100%" bottom={Platform.OS === "android" ? 10 : 20}>
            <Button marginHorizontal="md" onPress={() => navigate('Carrinho')}>Comprar</Button>
         </VStack>
      </>
   );
};

