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

import { usuarioAtualizaEndereco, usuarioObtemDadosEndereco } from '../../services/perfil';
import { cepMask, cpfMask } from '../../utils/Maskara';
import { estadosBrasileiros } from '../../utils/estadosBrasileiros';
import { Icon } from '../../icons';
import { z } from 'zod';
import { ObtemEnderecoCep } from '../../services/sercicosExternos';
import { InputCep } from '../../components/Inputs/inputCep';

const schema = z.object({
   cep: z.string(),
   logradouro: z.string(),
   numero: z.string(),
   bairro: z.string(),
   cidade: z.string(),
   complemento: z.string(),
   estado: z.string(),
});

type FormProps = z.input<typeof schema>;

export const PerfilMeusEndereco = () => {
   const insets = useSafeAreaInsets();
   const { goBack } = useNavigation();
   const { user } = useAuth();

   const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormProps>({
      resolver: zodResolver(schema),
      async defaultValues() {
         const endereco = await usuarioObtemDadosEndereco();
         return {
            ...endereco,
            cep: cepMask(endereco.cep)
         }
      },
   });

   const handleAction = useMutation({
      mutationFn: (form: FormProps) => usuarioAtualizaEndereco(user?.id, form),
      mutationKey: ['usuarioAtualizaEndereco'],
      onSuccess() {
         goBack()
      }
   });

   const handleCep = useMutation({
      mutationFn: ObtemEnderecoCep,
      mutationKey: ['PerfilObtemEnderecoCep'],
      onSuccess(data) {
         if (data) {
            setValue("bairro", data.bairro);
            setValue("cep", cepMask(data.cep));
            setValue("cidade", data.localidade);
            setValue("estado", data.uf);
            setValue("logradouro", data.logradouro);
         }
      }
   })

   return (
      <>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">

                  <VStack gap="lg" flex={1}>
                     <InputCep
                        label="CEP"
                        iconLeft={<Icon.Pin size={24} />}
                        name='cep'
                        placeholder='00000-000'
                        control={control}
                        error={errors?.cep?.message}
                        inputMode='numeric'
                        handleCep={handleCep}
                     />

                     <InputText
                        label="Logradouro"
                        iconLeft={<Icon.Pin size={24} />}
                        name='logradouro'
                        placeholder='Rua dona...'
                        control={control}
                        error={errors?.logradouro?.message}
                     />

                     <InputText
                        label="Número"
                        iconLeft={<Icon.Pin size={24} />}
                        name='numero'
                        placeholder='123..'
                        control={control}
                        mask={cpfMask}
                        error={errors?.numero?.message}
                        inputMode='decimal'
                     />

                     <InputText
                        label="Complemento"
                        iconLeft={<Icon.Pin size={24} />}
                        name='complemento'
                        placeholder='Bloco X 123'
                        control={control}
                        error={errors?.complemento?.message}
                     />

                     <InputText
                        label="Bairro"
                        iconLeft={<Icon.Pin size={24} />}
                        name='bairro'
                        placeholder='Bairro Novo Mundo'
                        control={control}
                        error={errors?.bairro?.message}
                     />

                     <InputSelecionar
                        placeholder='Estado onde moro'
                        label='Estado'
                        name={`estado`}
                        control={control}
                        option={estadosBrasileiros}
                        error={errors?.estado?.message}
                     />

                  </VStack>

                  <VStack gap="md">
                     <Button
                        loading={handleAction.isPending}
                        onPress={handleSubmit((form => handleAction.mutate(form)))}>
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
