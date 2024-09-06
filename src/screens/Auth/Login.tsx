import React from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, Image, Pressable, StatusBar, Linking } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';

import { GradienteApp } from '../../components/GradienteApp';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { InputPassword } from '../../components/Inputs/Password';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';
import Text from '../../components/Text';

import { IconFingerPrint } from '../../icons/IconFingerPrint';
import { Icon } from '../../icons';
import { useAuth, usuarioStorage } from '../../hooks/auth';
import { RouteApp } from '../../@types/navigation';
import { USUARIO, SENHA } from "@env";
import { z } from 'zod';

const schema = z.object({
   user: z.string().email({
      message: "Email inválido",
   }),
   password: z.string().min(4, "Mínimo 4 caracteres"),
   versao: z.number().optional(),
   dispositivo: z.enum(["app"])
});

type LoginFormInputs = z.input<typeof schema>;
type EventoDetalheRouteProp = RouteProp<RouteApp, 'Login'>;

export function Login() {
   const { navigate } = useNavigation();
   const { handleSignIn, loading } = useAuth();
   const { params } = useRoute<EventoDetalheRouteProp>();
   const { height, width } = Dimensions.get("screen");

   const { control, handleSubmit, formState: { errors }
   } = useForm<LoginFormInputs>({
      resolver: zodResolver(schema),
      defaultValues: {
         user: USUARIO || '',
         password: SENHA || '',
         versao: 2.0,
         dispositivo: "app",
      }
   });

   const handleLogin = async (data: LoginFormInputs) => {
      if (params?.redirect) {
         usuarioStorage.set('route', params?.redirect)
      }

      handleSignIn.mutate(data);
   };

   const minHeight = (0.92 * height) // 92% da tela
   const size = width >= 1024 ? "80%" : "100%";

   return (
      <>
         <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
         <GradienteApp>
            <Layout.Keyboard>
               <Layout.Scroll
                  scrollEnabled={false}
                  contentContainerStyle={{ minHeight, padding: 10 }}>

                  <VStack flex={1} justifyContent='center' alignItems='center'>
                     <Image
                        resizeMode='cover'
                        fadeDuration={2}
                        source={require("../../../assets/imagem/logo-white.png")} />
                  </VStack>

                  <VStack gap="md" flex={1} maxWidth={size} width="100%" alignSelf='center'>
                     <InputText
                        variant='solid'
                        label="E-mail"
                        iconLeft={<Icon.EnvelopeSolid color='#fff' size={24} />}
                        name='user'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.user?.message}
                        autoCapitalize='none'
                        keyboardType='email-address'
                     />

                     <InputPassword
                        variant='solid'
                        label="Senha"
                        iconLeft={<IconFingerPrint color='#fff' size={24} />}
                        name='password'
                        placeholder='Digite sua senha'
                        control={control}
                        error={errors?.password?.message}
                     />

                     <Button onPress={handleSubmit(handleLogin)}>
                        {!loading ? 'ENTRAR' : 'autenticando...'}
                     </Button>

                     <Pressable onPress={() => navigate('EsqueciSenha')}>
                        <Text textAlign="center" fontSize={14} color='white'>Esqueceu a senha?</Text>
                     </Pressable>
                  </VStack>

                  <VStack gap="md">
                     <Pressable onPress={() => navigate("CriarConta")}>
                        <Text textAlign="center" fontSize={14} color='white'>Ainda não tem conta:{' '}
                           <Text color='white' fontSize={16} fontWeight="900">
                              cadastre-se
                           </Text>
                        </Text>
                     </Pressable>
                  </VStack>

               </Layout.Scroll>
            </Layout.Keyboard>
         </GradienteApp>

      </>
   );
};
