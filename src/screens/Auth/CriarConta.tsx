import React from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';

import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Icon } from '../../icons';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IconFingerPrint } from '../../icons/IconFingerPrint';

const schema = z.object({
   nome: z.string(),
   email: z.string().email({
      message: "Email inválido",
   }),
   cpf: z.string(),
   telefone: z.string(),
   sexo: z.string(),
   nascimento: z.string(),
   senha: z.string(),
   confirmar_senha: z.string(),
});

type LoginFormInputs = z.input<typeof schema>;

export function CriarConta() {
   const { control, handleSubmit, formState: { errors }
   } = useForm<LoginFormInputs>({
      resolver: zodResolver(schema)
   });

   const onSubmit = (data: LoginFormInputs) => console.log(data);

   return (
      <Layout.Root>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">
                  <VStack gap="lg" flex={1}>
                     <InputText
                        label="Nome"
                        iconLeft={<Icon.Envelope size={24} />}
                        name='nome'
                        placeholder='Digite seu nome'
                        control={control}
                        error={errors?.nome?.message}
                     />

                     <InputText
                        label="E-mail"
                        iconLeft={<Icon.Envelope size={24} />}
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                     />

                     <InputText
                        label="CPF"
                        iconLeft={<Icon.Envelope size={24} />}
                        name='cpf'
                        placeholder='xxx.xxx.xxx-xx'
                        control={control}
                        error={errors?.cpf?.message}
                     />

                     <InputText
                        label="Telefone"
                        iconLeft={<Icon.Envelope size={24} />}
                        name='telefone'
                        placeholder='(00) 00000-0000'
                        control={control}
                        error={errors?.telefone?.message}
                     />

                     <InputText
                        label="Sexo"
                        iconLeft={<Icon.Envelope size={24} />}
                        name='sexo'
                        placeholder='Selecione o Sexo'
                        control={control}
                        error={errors?.sexo?.message}
                     />

                     <InputText
                        label="Data de nascimento"
                        iconLeft={<Icon.Calendario size={24} />}
                        name='nascimento'
                        placeholder='00/00/0000'
                        control={control}
                        error={errors?.email?.message}
                     />
                     <InputText
                        label="Senha"
                        iconLeft={<IconFingerPrint size={24} />}
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                     />
                     <InputText
                        label="Confirme a sua senha"
                        iconLeft={<IconFingerPrint size={24} />}
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                     />
                  </VStack>

                  <VStack gap="md">
                     <Button onPress={handleSubmit(onSubmit)} >
                        CRIAR CONTA
                     </Button>
                  </VStack>

               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>
      </Layout.Root>

   );
};
