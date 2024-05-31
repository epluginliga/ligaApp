import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, Pressable, SafeAreaView, StatusBar, View } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Section } from '../../components/Section';
import { Icon } from '../../icons';
import { formataData } from '../../utils/utils';
import VStack from '../../components/Views/Vstack';
import { Html } from '../../components/Html';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Views/Layout';
import { IconShare } from '../../icons/IconShare';
import { RouteApp } from '../../@types/navigation';

import { data as eventoDetalhe } from '../../../store/eventoId';
import Circle from '../../components/Views/Circle';
import { useAuth, usuarioStorage } from '../../hooks/auth';
import { Loading } from '../../components/Loading';
import { useMMKVString } from 'react-native-mmkv';
type EventoDetalheRouteProp = RouteProp<RouteApp, 'EventosDetalhe'>;

export const EventosDetalhe = () => {
   const { navigate } = useNavigation();
   const { logado } = useAuth();
   const { params } = useRoute<EventoDetalheRouteProp>();
   const scrollY = useSharedValue(0);
   const [route] = useMMKVString('route')

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
      },
   });

   const animatedStyles = useAnimatedStyle(() => {
      const height = interpolate(scrollY.value, [0, 80], [300, 250, 0], "clamp");
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

   useEffect(() => {
      const time = setTimeout(() => {
         if (route && logado) {
            navigate(route as any);
            usuarioStorage.delete('route');
         }
      }, 1000);

      return () => clearTimeout(time);

   }, [route, logado]);

   return (
      <>
         {route && logado && <Loading />}
         <StatusBar barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"} />

         <Animated.View style={[
            {
               backgroundColor: "white",
               position: "absolute",
               zIndex: 99,
               width: "100%"
            }, textStyles]}>

            <SafeAreaView>
               <Layout.Header title={eventoDetalhe.nome}
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
         >
            <Animated.View
               renderToHardwareTextureAndroid
               style={[{ height: 300 }, animatedStyles]}>
               <ImageBackground
                  style={{ height: "100%", width: "100%" }}
                  source={{ uri: eventoDetalhe.path_imagem }} >
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

            <Section.Root position='relative' zIndex={9}>

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
                  <View style={{ height: 180 }} />

               </VStack>
            </Section.Root>

         </Animated.ScrollView>

         <VStack
            position="absolute"
            justifyContent='center'
            width="100%"
            bottom={Platform.OS === "android" ? 10 : 30}
         >
            <Button marginHorizontal="md"
               onPress={() => {
                  if (logado) {
                     return navigate('Carrinho');
                  }

                  return navigate("Login", {
                     redirect: "Carrinho",
                  });

               }}>
               Comprar
            </Button>
         </VStack>
      </>
   );
};

