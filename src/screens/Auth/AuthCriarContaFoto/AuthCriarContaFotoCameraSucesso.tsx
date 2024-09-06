import React from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeInRight, FadeInUp, FadeOutDown, FadeOutRight } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from "@tanstack/react-query";
import VStack, { VStackProps } from '../../../components/Views/Vstack';
import { RouteApp } from '../../../@types/navigation';
import { imagemApp } from '../../../utils/utils';
import { usuarioCadastraImagem } from '../../../services/perfil';
import { Icon } from '../../../icons';
import HStack from '../../../components/Views/Hstack';
import Text from '../../../components/Text';
import { Button } from '../../../components/Button';
import { Theme } from '../../../theme/default';


const queryClient = useQueryClient()

type BordasProps = VStackProps & {
   children: React.ReactNode;
   size: number;
   delay: number;
}
function Bordas({ children, size, delay, ...rest }: BordasProps) {
   return (
      <Animated.View
         entering={FadeIn.delay(delay).easing(Easing.linear)}
         exiting={FadeOutRight.delay(delay)}
      >
         <VStack
            height={size}
            width={size}
            alignItems="center"
            justifyContent="center"
            borderRadius={300}
            {...rest}>
            {children}
         </VStack>
      </Animated.View>
   )
}

type AuthCriarContaFotoSucessoRouteProp = RouteProp<RouteApp, 'AuthCriarContaFotoSucesso'>;

export function AuthCriarContaFotoSucesso() {
   const { colors } = useTheme<Theme>();
   const insets = useSafeAreaInsets();
   const navigate = useNavigation();
   const { params } = useRoute<AuthCriarContaFotoSucessoRouteProp>()

   const handleUploadImagem = useMutation({
      mutationFn: async () => {
         let base64Image = await imagemApp(params.path).base64File();

         const jsonData = {
            path_camera_web: false,
            path_avatar_camera: base64Image,
            tipo_imagem_camera: "image/jpg"
         };

         return usuarioCadastraImagem(jsonData);
      },
      onSuccess() {
         queryClient.invalidateQueries({ queryKey: ['obtemDadosLogadoIndex'] })
         navigate.navigate("PerfilTab");
      },
   });

   return (
      <View style={{
         marginBottom: insets.bottom,
         flex: 1
      }}>
         <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >

            <VStack gap="lg" justifyContent="space-between" alignItems="center" p="sm">

               <Bordas size={100} delay={500} backgroundColor="verde_200">
                  <Bordas size={75} delay={600} backgroundColor="verde_300">
                     <Bordas size={50} delay={700} backgroundColor="verde_400">
                        <Icon.CheckCircle size={20} color="#fff" />
                     </Bordas>
                  </Bordas>
               </Bordas>

               <Pressable onPress={() => navigate.goBack()}>
                  <Image
                     source={{ uri: params.path }}
                     style={{
                        width: 300,
                        height: 300,
                        borderRadius: 30
                     }}
                  />

                  <VStack position='absolute'
                     p='md'
                     variant='shadow'
                     backgroundColor='white'
                     top={-20}
                     left={-10}
                     borderRadius={100}
                  >
                     <Icon.X />
                  </VStack>
               </Pressable>
            </VStack>
         </ Animated.View>

         <Animated.View
            entering={FadeInRight.damping(3).delay(4)}
            exiting={FadeOutDown}
            style={{ flex: 0.5 }}
         >
            <HStack m='md' alignItems='center' justifyContent='space-between' gap='sm'>
               <VStack backgroundColor='bege' p='sm' borderRadius={10}>
                  <Icon.FaceID color={colors.bege_200} />
               </VStack>

               <VStack flex={1}>
                  <Text fontSize={16}>
                     A Foto deverá ser bem iluminada, e que mostre bem os <Text fontWeight="700">olhos</Text>, e
                     <Text fontWeight="700">{' '}boca</Text>.
                  </Text>
               </VStack>
            </HStack>

            <HStack m='md' alignItems='center' justifyContent='space-between' gap='sm'>
               <VStack backgroundColor='bege' p='sm' borderRadius={10}>
                  <Icon.CheckCircle color={colors.bege_200} />
               </VStack>

               <VStack flex={1}>
                  <Text fontSize={16}>
                     Você confirma que a foto atende esses requesitos?
                  </Text>
               </VStack>
            </HStack>

            <Button
               loading={handleUploadImagem.isPending}
               iconRight={<Icon.CheckCircle color='#fff' />}
               variant='sucesso'
               onPress={() => handleUploadImagem.mutate()}>
               Salvar
            </Button>
         </Animated.View>
      </View>
   )
}