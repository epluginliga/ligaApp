import React from 'react';
import { useForm } from 'react-hook-form';

import { GradienteApp } from '../../components/GradienteApp';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { InputPassword } from '../../components/Inputs/Password';
import VStack from '../../components/Views/Vstack';
import { IconFingerPrint } from '../../icons/IconFingerPrint';
import { InputText } from '../../components/Inputs/Text';

import Text from '../../components/Text';
import { Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '../../icons';

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

   return (
      <GradienteApp>
         <Layout.Root>
            <Layout.Keyboard>
               <Layout.Scroll>

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
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                        autoCapitalize='none'
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

                     <Button onPress={handleSubmit(onSubmit)}>
                        ENTRAR
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

   );
};
