import React from 'react';
import { useForm } from 'react-hook-form';

import { GradienteApp } from '../../components/GradienteApp';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { IconEnvelope } from '../../icons';
import { InputPassword } from '../../components/Inputs/Password';
import VStack from '../../components/Views/Vstack';
import { IconFingerPrint } from '../../icons/FingerPrint';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Text from '../../components/Text';
import { Dimensions, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Defina o schema de validação usando Zod
const schema = z.object({
   email: z.string().email({
      message: "Email inválido",
   }),
   password: z.string().min(8, "Mínimo 8 caracteres"),
});

type LoginFormInputs = z.input<typeof schema>;

export function Login() {
   const { navigate } = useNavigation();
   const { control, handleSubmit, formState: { errors }
   } = useForm<LoginFormInputs>({
      resolver: zodResolver(schema)
   });

   const onSubmit = (data: LoginFormInputs) => console.log(data);
   const window = Dimensions.get("window");

   return (
      <GradienteApp>
         <Layout.Root>
            <Layout.Keyboard>
               <Layout.Scroll>
                  <VStack gap="lg" p="sm" minHeight={window.height}>

                     <VStack flex={1} justifyContent='center' alignItems='center'>
                        <Image
                           resizeMode='cover'
                           fadeDuration={2}
                           source={require("../../../assets/imagem/logo-white.png")} />
                     </VStack>

                     <VStack gap="lg">
                        <InputText
                           variant='solid'
                           label="E-mail"
                           iconLeft={<IconEnvelope color='#fff' size={24} />}
                           name='email'
                           placeholder='seu@email.com'
                           control={control}
                           error={errors?.email?.message}
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
                     </VStack>

                     <VStack flex={1} gap="md">
                        <Button onPress={handleSubmit(onSubmit)}>
                           ENTRAR
                        </Button>

                        <Pressable onPress={() => navigate('EsqueciSenha')}>
                           <Text textAlign="center" fontSize={14} color='white'>Esqueceu a senha?</Text>
                        </Pressable>
                     </VStack>

                     <VStack flex={0.2} >

                        <Pressable onPress={() => navigate('CriarConta')}>
                           <Text textAlign="center" fontSize={14} color='white'>Ainda não tem conta{' '}
                              <Text fontSize={14} fontWeight="900">
                                 Cadastre-se
                              </Text>
                           </Text>
                        </Pressable>
                     </VStack>
                  </VStack>
               </Layout.Scroll>
            </Layout.Keyboard>
         </Layout.Root>
      </GradienteApp>

   );
};
