import React from 'react';
import { TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
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
import { ObtemEnderecoCep, PayloadObtemEnderecoCep } from '../../services/sercicosExternos';
import { Input, InputDefault } from '../../components/Inputs';
import theme from '../../theme/default';

type InputCepProps = InputDefault & {
   name: string;
   control: any;
   mask?: (val: string) => string;
   editable?: boolean;
   handleCep: UseMutationResult<PayloadObtemEnderecoCep, Error, number, unknown>;
}

function InputCep({ name, control, handleCep, ...rest }: InputCepProps) {
   return (
      <Input {...rest}>
         <Controller
            name={name}
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => {
               return (
                  <TextInput
                     placeholderTextColor={rest.variant ? theme.colors.white : theme.colors.bege_900}
                     onChangeText={(text) => onChange(cepMask(text))}
                     value={value}
                     onBlur={() => handleCep.mutate(value.replace(/\D/g, ''))}
                     style={{
                        fontSize: theme.spacing.md,
                        fontFamily: theme.fonts.medium,
                        color: theme.colors.bege_900,
                        borderColor: theme.colors.primary,
                        flex: 1,
                     }}
                     {...rest}
                  />
               )
            }}
         />
      </Input>
   )
}
const schema = z.object({
   usuario: z.object({
      nome: z.string().optional(),
   }),
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
   const { user } = useAuth();

   const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormProps>({
      resolver: zodResolver(schema),
      async defaultValues() {
         const endereco = await usuarioObtemDadosEndereco()
         return {
            usuario: {
               nome: user.nome
            },
            endereco: {
               ...endereco,
               cep: cepMask(endereco.cep)
            }
         }
      },
   });

   const handleAction = useMutation({
      mutationFn: (form: FormProps) => usuarioAtualizaGeral(user?.id, form),
      mutationKey: ['criaUsuario'],
      onSuccess() {
         goBack()
      }
   });

   const handleCep = useMutation({
      mutationFn: ObtemEnderecoCep,
      mutationKey: ['ObtemEnderecoCep'],
      onSuccess(data) {
         console.log(JSON.stringify(data, null, 1))
         if (data) {
            setValue("endereco.bairro", data.bairro);
            setValue("endereco.cep", cepMask(data.cep));
            setValue("endereco.cidade", data.localidade);
            setValue("endereco.complemento", data.complemento);
            setValue("endereco.estado", data.uf);
            setValue("endereco.logradouro", data.logradouro);
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
                        name='endereco.cep'
                        placeholder='00000-000'
                        control={control}
                        error={errors?.endereco?.cep?.message}
                        inputMode='numeric'
                        handleCep={handleCep}
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
                        label="Número"
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
