import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { GradienteApp } from '../../components/GradienteApp';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { InputPassword } from '../../components/Inputs/Password';
import VStack from '../../components/Views/Vstack';
import { IconFingerPrint } from '../../icons/IconFingerPrint';
import { InputText } from '../../components/Inputs/Text';

import Text from '../../components/Text';
import { Image, Pressable, StatusBar } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '../../icons';
import { useAuth, usuarioStorage } from '../../hooks/auth';
import { RouteApp } from '../../@types/navigation';

const schema = z.object({
   user: z.string().email({
      message: "Email inválido",
   }),
   password: z.string().min(4, "Mínimo 4 caracteres"),
});

type LoginFormInputs = z.input<typeof schema>;
type EventoDetalheRouteProp = RouteProp<RouteApp, 'Login'>;


export function Login() {
   const { navigate } = useNavigation();
   const { handleSignIn, loading } = useAuth();
   const { params } = useRoute<EventoDetalheRouteProp>();

   const { control, handleSubmit, formState: { errors }
   } = useForm<LoginFormInputs>({
      resolver: zodResolver(schema),
      defaultValues: {
         user: "jean.silva@eplugin.app.br",
         password: "123456",
      }
   });

   const handleLogin = async (data: LoginFormInputs) => {
      try {
         if (params?.redirect) {
            usuarioStorage.set('route', params?.redirect)
         }

         handleSignIn(data);
      } catch { }
   };

   return (
      <>
         <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />

         <GradienteApp>
            <Layout.Root >
               <Layout.Keyboard>
                  <Layout.Scroll contentContainerStyle={{ minHeight: "96%", padding: 10 }}>

                     <VStack flex={1} justifyContent='center' alignItems='center'>
                        <Image
                           resizeMode='cover'
                           fadeDuration={2}
                           source={require("../../../assets/imagem/logo-white.png")} />
                     </VStack>

                     <VStack gap="md" flex={1}>
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
                           {!loading ? 'ENTRAR' : 'Autencicando...'}
                        </Button>

                        <Pressable onPress={() => navigate('EsqueciSenha')}>
                           <Text textAlign="center" fontSize={14} color='white'>Esqueceu a senha?</Text>
                        </Pressable>
                     </VStack>

                     <VStack gap="md" mb="sm">
                        <Pressable onPress={() => navigate('CriarConta')}>
                           <Text textAlign="center" fontSize={14} color='white'>Ainda não tem conta:{' '}
                              <Text color='white' fontSize={16} fontWeight="900">
                                 Cadastre-se
                              </Text>
                           </Text>
                        </Pressable>
                     </VStack>

                  </Layout.Scroll>
               </Layout.Keyboard>
            </Layout.Root>
         </GradienteApp>

      </>

   );
};
