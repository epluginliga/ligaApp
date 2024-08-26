import React from 'react';
import Animated, { Easing, FadeIn, FadeInRight, FadeInUp, FadeOutDown, FadeOutRight } from 'react-native-reanimated';
import VStack, { VStackProps } from '../../../../components/Views/Vstack';
import { Icon } from '../../../../icons';
import { Image, Pressable, View } from 'react-native';
import Text from '../../../../components/Text';
import HStack from '../../../../components/Views/Hstack';
import { Button } from '../../../../components/Button';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../theme/default';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { usuarioCadastraImagem } from '../../../../services/perfil';
import { imagemApp } from '../../../../utils/utils';

type PerfilFotoCameraSucessoProps = {
   uri: string;
   clean: Function
}

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


export function PerfilFotoCameraSucesso({ uri, clean }: PerfilFotoCameraSucessoProps) {
   const { colors } = useTheme<Theme>();
   const insets = useSafeAreaInsets();
   const navigate = useNavigation();


   const handleUploadImagem = useMutation({
      mutationFn: async () => {
         let base64Image = await imagemApp(uri).base64File();

         const jsonData = {
            path_camera_web: false,
            path_avatar_camera: base64Image,
            tipo_imagem_camera: "image/jpg"
         };

         return usuarioCadastraImagem(jsonData);
      },
      onSuccess(data) {
         clean();
         navigate.navigate("Perfil");
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

               <Pressable onPress={() => clean()}>

                  <Image
                     source={{ uri }}
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