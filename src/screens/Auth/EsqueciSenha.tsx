import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Icon } from '../../icons';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import Text from '../../components/Text';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { resetarSenha } from '../../services/auth';
import theme from '../../theme/default';
import { useNavigation } from '@react-navigation/native';

const schema = z.object({
   email: z.string().email({
      message: "Email inválido",
   }),
});

type LoginFormInputs = z.input<typeof schema>;

export function EsqueciSenha() {
   const [sucesso, setSucesso] = useState('');
   const { control, handleSubmit, formState: { errors }
   } = useForm<LoginFormInputs>({
      resolver: zodResolver(schema)
   });
   const navigate = useNavigation();
   const insets = useSafeAreaInsets();

   const handleCriaConta = useMutation({
      mutationFn: (form: LoginFormInputs) => resetarSenha(form),
      mutationKey: ['resetSenha'],
      onSuccess(data) {
         setSucesso(data.mensagem);
      },
   });

   return (
      <>
         <StatusBar barStyle="dark-content" backgroundColor="#fff" />

         <Layout.Keyboard>
            <Layout.Header title='Recuperar senha' />

            <Layout.Scroll contentContainerStyle={{ flexGrow: 1 }}>

               <VStack gap="lg" p="sm" justifyContent='space-between'>

                  <VStack flex={1.5} justifyContent='center' alignItems='center'>
                     <Text color='bege_900' fontWeight="200" textAlign='center' fontSize={16}>
                        Digite seu e-mail de cadastro para envio da sua senha
                     </Text>
                  </VStack>

                  {sucesso ? (
                     <VStack mt='lg' justifyContent='center' gap='lg' alignItems='center' flex={1}>
                        <Icon.CheckCircle size={50} color={theme.colors.greenDark} />
                        <Text textAlign='center' color="greenDark">
                           {sucesso}
                        </Text>
                     </VStack>
                  ) : (
                     <VStack gap="xs" flex={1}>
                        <InputText
                           keyboardType='email-address'
                           autoCapitalize='none'
                           label="E-mail"
                           iconLeft={<Icon.Envelope size={24} />}
                           name='email'
                           placeholder='seu@email.com'
                           control={control}
                           error={errors?.email?.message}
                        />
                     </VStack>
                  )}
               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>

         {sucesso ? (
            <Button
               iconRight={false}
               iconLeft={<Icon.ArrowLeft color='white' />}
               onPress={handleSubmit((form) => navigate.goBack())}
            >
               VOLTAR
            </Button>
         ) : (
            <Button onPress={handleSubmit((form) => handleCriaConta.mutate(form))} >
               RECUPERAR
            </Button>
         )}
         <View style={{ marginBottom: insets.bottom + 20 }} />

      </>
   );
};
