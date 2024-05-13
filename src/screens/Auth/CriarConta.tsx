import React from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';

import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { IconCalendario, IconEnvelope } from '../../icons';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Text from '../../components/Text';
import { IconFingerPrint } from '../../icons/FingerPrint';

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
   const window = Dimensions.get("window");

   return (
      <Layout.Root>
         <Layout.Keyboard>
            <Layout.Scroll>
               <VStack gap="lg" p="sm" minHeight={window.height}>



                  <VStack gap="lg">

                     <InputText
                        label="Nome"
                        iconLeft={<IconEnvelope size={24} />}
                        name='nome'
                        placeholder='Digite seu nome'
                        control={control}
                        error={errors?.nome?.message}
                     />

                     <InputText
                        label="E-mail"
                        iconLeft={<IconEnvelope size={24} />}
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                     />

                     <InputText
                        label="CPF"
                        iconLeft={<IconEnvelope size={24} />}
                        name='cpf'
                        placeholder='xxx.xxx.xxx-xx'
                        control={control}
                        error={errors?.cpf?.message}
                     />

                     <InputText
                        label="Telefone"
                        iconLeft={<IconEnvelope size={24} />}
                        name='telefone'
                        placeholder='(00) 00000-0000'
                        control={control}
                        error={errors?.telefone?.message}
                     />

                     <InputText
                        label="Sexo"
                        iconLeft={<IconEnvelope size={24} />}
                        name='sexo'
                        placeholder='Selecione o Sexo'
                        control={control}
                        error={errors?.sexo?.message}
                     />

                     <InputText
                        label="Data de nascimento"
                        iconLeft={<IconCalendario size={24} />}
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

                  <VStack flex={1} gap="md">
                     <Button onPress={handleSubmit(onSubmit)} >
                        RECUPERAR
                     </Button>
                  </VStack>

               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>
      </Layout.Root>

   );
};
