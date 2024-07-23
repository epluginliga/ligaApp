import React from 'react';
import { useForm } from 'react-hook-form';

import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Icon } from '../../icons';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IconFingerPrint } from '../../icons/IconFingerPrint';
import { InputPassword } from '../../components/Inputs/Password';
import { useMutation } from '@tanstack/react-query';
import { criaUsuario } from '../../services/usuario';
import { cpfMask, dataMask, telefoneMask } from '../../utils/Maskara';
import { CriaUsuarioProps } from '../../services/@usuario';
import { InputSelecionar } from '../../components/Inputs/Selecionar';
import {
   NOME,
   PASSWORD,
   EMAIL,
   DOCUMENTO,
   TELEFONE,
   SEXO,
   NASCIMENTO,
   CONFIRMAR_SENHA
} from "@env"

const schema = z.object({
   nome: z.string(),
   email: z.string().email({
      message: "Email inválido",
   }),
   documento: z.string(),
   telefone: z.string(),
   sexo: z.string(),
   nascimento: z.string(),
   password: z.string(),
   confirmar_senha: z.string(),
   cadastro_app: z.string().optional(),
}).superRefine(({ confirmar_senha, password }, ctx) => {
   if (password !== confirmar_senha) {
      ctx.addIssue({
         code: 'custom',
         message: 'Senhas devem ser iguais',
         path: ['confirmar_senha']
      })
   }
});

export function CriarConta() {
   const { control, handleSubmit, formState: { errors }
   } = useForm<CriaUsuarioProps>({
      resolver: zodResolver(schema),
      defaultValues: {
         "nome": NOME,
         "password": PASSWORD,
         "email": EMAIL,
         "documento": DOCUMENTO,
         "telefone": TELEFONE,
         "sexo": SEXO,
         "nascimento": NASCIMENTO,
         "confirmar_senha": CONFIRMAR_SENHA,
         cadastro_app: true,
      }
   });

   const handleCriaConta = useMutation({
      mutationFn: (form: CriaUsuarioProps) => {
         return criaUsuario({ ...form, username: form.email });
      },
      mutationKey: ['criaUsuario'],
      onSuccess(data, variables, context) {
         console.log(JSON.stringify(data, null, 1))
      },
      onError(error, variables, context) {
         console.log(JSON.stringify(error, null, 1))
      },
   });

   return (
      <Layout.Root>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">
                  <VStack gap="lg" flex={1}>
                     <InputText
                        label="Nome"
                        iconLeft={<Icon.User size={24} />}
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
                        inputMode='email'
                     />

                     <InputText
                        label="CPF"
                        iconLeft={<Icon.AddressCard size={24} />}
                        name='documento'
                        placeholder='xxx.xxx.xxx-xx'
                        control={control}
                        mask={cpfMask}
                        error={errors?.documento?.message}
                        inputMode='decimal'
                     />

                     <InputText
                        label="Telefone"
                        iconLeft={<Icon.PhoneFlipe size={24} />}
                        name='telefone'
                        placeholder='(00) 00000-0000'
                        control={control}
                        error={errors?.telefone?.message}
                        inputMode='tel'
                        mask={telefoneMask}
                     />

                     <InputSelecionar
                        placeholder='Selecione o sexo'
                        label='Sexo'
                        name={`sexo`}
                        control={control}
                        option={[
                           {
                              label: "Masculino",
                              name: "masculino"
                           },
                           {
                              label: "Feminino",
                              name: "feminino"
                           },
                           {
                              label: "Não informar",
                              name: "naoinformar"
                           }
                        ]}
                        error={errors?.sexo?.message}
                     />

                     <InputText
                        label="Data de nascimento"
                        iconLeft={<Icon.Calendario size={24} />}
                        name='nascimento'
                        placeholder='dd/mm/yyyy'
                        mask={dataMask}
                        control={control}
                        inputMode='decimal'
                        maxLength={10}
                        error={errors?.nascimento?.message}
                     />

                     <InputPassword
                        label="Senha"
                        iconLeft={<IconFingerPrint size={24} />}
                        name='password'
                        placeholder='Escolha uma senha segura'
                        control={control}
                        error={errors?.password?.message}
                     />
                     <InputPassword
                        label="Confirme a sua senha"
                        iconLeft={<IconFingerPrint size={24} />}
                        name='confirmar_senha'
                        placeholder='Confirma sua senha'
                        control={control}
                        error={errors?.confirmar_senha?.message}
                     />
                  </VStack>

                  <VStack gap="md">
                     <Button
                        loading={handleCriaConta.isPending}
                        onPress={handleSubmit((form => handleCriaConta.mutate(form)))} >
                        CRIAR CONTA
                     </Button>
                  </VStack>

               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>
      </Layout.Root>

   );
};
