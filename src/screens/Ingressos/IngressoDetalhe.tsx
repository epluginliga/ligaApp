import React from 'react';
import { Image, ImageBackground, Platform, Pressable, SafeAreaView, StatusBar, View } from 'react-native';
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

import { data } from '../../../store/ingressos';
import Circle from '../../components/Views/Circle';
import Text from '../../components/Text';
import { Path, Svg } from 'react-native-svg';
import HStack from '../../components/Views/Hstack';
type EventoDetalheRouteProp = RouteProp<RouteApp, 'EventosDetalhe'>;

const eventoDetalhe = data.data[0];

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

export const IngressoDetalhe = () => {
   const { navigate } = useNavigation();
   const { params } = useRoute<EventoDetalheRouteProp>();
   console.log(params.id);
   const scrollY = useSharedValue(0);

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
      },
   });

   const animatedStyles = useAnimatedStyle(() => {
      const height = interpolate(scrollY.value, [0, 100], [300, 200, 0], "clamp");

      return { height };
   });

   const textStyles = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, [0, 100], [0, 1], 'clamp');
      return { opacity };
   });

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
               <Layout.Header title={eventoDetalhe.evento_nome}
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
                     <Layout.Header />
                  </SafeAreaView>
               </ImageBackground>
            </Animated.View>

            <LayoutTicket>

               <Section.Title>{eventoDetalhe.evento_nome}</Section.Title>

               <VStack>
                  <Section.SubTitle iconLeft={<Icon.Calendario />}>
                     {formataData(eventoDetalhe.evento_data_evento_format_db).DiaMesAnoTexto()}
                  </Section.SubTitle>

                  <VStack gap="xs">
                     <Section.SubTitle iconLeft={<Icon.Pin />}>
                        eventoDetalhe.nome_local {'\n'}
                        <Section.Span>
                           {eventoDetalhe.evento_cidade}
                        </Section.Span>
                     </Section.SubTitle>
                  </VStack>
               </VStack>

               <VStack alignItems='center' gap='lg' marginVertical='xl'>
                  <Image source={require('../../../assets/imagem/qrcode.png')} />
                  <Text variant='header'>{eventoDetalhe.lote_nome}</Text>
               </VStack>

               <HStack justifyContent='space-between' mt='xl'>
                  <Text variant='labelInput' color='black'>#codigobilhete</Text>
                  <Text variant='labelInput' color='black'>#codigobilhete</Text>
               </HStack>


            </LayoutTicket>

         </Animated.ScrollView>


      </>
   );
};

