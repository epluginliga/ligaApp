import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../../hooks/auth';

import { Layout } from '../../components/Views/Layout';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';
import { InputSelecionar } from '../../components/Inputs/Selecionar';
import { Button } from '../../components/Button';

import { usuarioAtualizaGeral, usuarioObtemDadosEndereco } from '../../services/perfil';
import { cepMask, cpfMask } from '../../utils/Maskara';
import { estadosBrasileiros } from '../../utils/estadosBrasileiros';
import { Icon } from '../../icons';
import { z } from 'zod';

const schema = z.object({
   endereco: z.object({
      cep: z.string(),
      logradouro: z.string(),
      numero: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      complemento: z.string(),
      estado: z.string(),
   })
});

type FormProps = z.input<typeof schema>;

export const PerfilMeusEndereco = () => {
   const insets = useSafeAreaInsets();
   const { goBack } = useNavigation();
   const { user_id } = useAuth();

   const handleAction = useMutation({
      mutationFn: (form: FormProps) => usuarioAtualizaGeral(user_id, form),
      mutationKey: ['criaUsuario'],
      onSuccess() {
         goBack()
      }, onError(error) {
         console.log(JSON.stringify(error, null, 1))
      },
   });

   const { control, handleSubmit, formState: { errors }, getValues
   } = useForm<FormProps>({
      resolver: zodResolver(schema),
      async defaultValues() {
         const endereco = await usuarioObtemDadosEndereco()
         return {
            endereco: {
               ...endereco,
               cep: cepMask(endereco.cep)
            }
         }
      },
   });

   return (
      <>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">

                  <VStack gap="lg" flex={1}>
                     <InputText
                        label="CEP"
                        iconLeft={<Icon.Pin size={24} />}
                        name='endereco.cep'
                        placeholder='00000-000'
                        control={control}
                        error={errors?.endereco?.cep?.message}
                        inputMode='numeric'
                     />

                     <InputText
                        label="Logradouro"
                        iconLeft={<Icon.Pin size={24} />}
                        name='endereco.logradouro'
                        placeholder='Rua dona...'
                        control={control}
                        error={errors?.endereco?.logradouro?.message}
                     />

                     <InputText
                        iconLeft={<Icon.Pin size={24} />}
                        name='endereco.numero'
                        placeholder='123..'
                        control={control}
                        mask={cpfMask}
                        error={errors?.endereco?.numero?.message}
                        inputMode='decimal'
                     />

                     <InputText
                        label="Complemento"
                        iconLeft={<Icon.Pin size={24} />}
                        name='endereco.complemento'
                        placeholder='Bloco X 123'
                        control={control}
                        error={errors?.endereco?.complemento?.message}
                     />

                     <InputText
                        label="Bairro"
                        iconLeft={<Icon.Pin size={24} />}
                        name='endereco.bairro'
                        placeholder='Bairro Novo Mundo'
                        control={control}
                        error={errors?.endereco?.bairro?.message}
                     />

                     <InputSelecionar
                        placeholder='Estado onde moro'
                        label='Estado'
                        name={`endereco.estado`}
                        control={control}
                        option={estadosBrasileiros}
                        error={errors?.endereco?.estado?.message}
                     />

                  </VStack>

                  <VStack gap="md">
                     <Button
                        loading={handleAction.isPending}
                        onPress={handleSubmit((form => {
                           // console.log(JSON.stringify(form))
                           handleAction.mutate(form)
                        }))} >
                        SALVAR
                     </Button>

                     <View style={{ marginBottom: insets.bottom + 4 }} />
                  </VStack>

               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>

      </>
   )
}
