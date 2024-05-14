import React from 'react';
import { useForm } from 'react-hook-form';

import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { IconEnvelope } from '../../icons';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Text from '../../components/Text';

const schema = z.object({
   email: z.string().email({
      message: "Email inválido",
   }),
});

type LoginFormInputs = z.input<typeof schema>;

export function EsqueciSenha() {
   const { control, handleSubmit, formState: { errors }
   } = useForm<LoginFormInputs>({
      resolver: zodResolver(schema)
   });

   const onSubmit = (data: LoginFormInputs) => console.log(data);

   return (
      <Layout.Root>
         <Layout.Keyboard>
            <Layout.Header title='Recuperar senha' />
            <Layout.Scroll>

               <VStack gap="lg" p="sm" flex={1}>

                  <VStack flex={0.5} justifyContent='center' alignItems='center'>
                     <Text color='bege_900' fontWeight="200" textAlign='center' fontSize={16}>
                        Digite seu e-mail de cadastro para envio da sua senha
                     </Text>
                  </VStack>

                  <VStack gap="md">
                     <InputText
                        label="E-mail"
                        iconLeft={<IconEnvelope size={24} />}
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                     />

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
