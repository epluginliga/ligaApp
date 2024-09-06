import React from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';

import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Icon } from '../../icons';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IconFingerPrint } from '../../icons/IconFingerPrint';
import { InputPassword } from '../../components/Inputs/Password';
import { useMutation, useQuery } from '@tanstack/react-query';
import { criaUsuario } from '../../services/usuario';
import { cepMask, cpfMask, dataMask, telefoneMask } from '../../utils/Maskara';
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
import { Dimensions } from 'react-native';
import { InputCep } from '../../components/Inputs/inputCep';
import { ObtemEnderecoCep } from '../../services/sercicosExternos';
import { InputDefault } from '../../components/Inputs';
import { estadosBrasileiros } from '../../utils/estadosBrasileiros';
import { useNavigation } from '@react-navigation/native';
import { AvatarUsuario } from '../../components/AvatarUsuario';
import Text from '../../components/Text';

function Header() {
   const navigate = useNavigation();

   return (
      <AvatarUsuario onPress={() => {
         return navigate.navigate("AuthCriarContaFoto")
      }} >
         <Text variant='labelInput' fontWeight="400">*Envie sua foto para reconhecimento facial</Text>
      </AvatarUsuario>
   )
}

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
   cadastro_app: z.boolean().optional(),
   cep: z.string(),
   bairro: z.string(),
   cidade: z.string(),
   complemento: z.string(),
   estado: z.string(),
   logradouro: z.string(),
}).superRefine(({ confirmar_senha, password }, ctx) => {
   if (password !== confirmar_senha) {
      ctx.addIssue({
         code: 'custom',
         message: 'Senhas devem ser iguais',
         path: ['confirmar_senha']
      })
   }
});

type CepProps = InputDefault & {
   name: string;
   control: any;
   editable?: boolean;
   setValue: UseFormSetValue<CriaUsuarioProps>;
   reset?: Function;
}

export function Cep({ setValue, control, error, ...rest }: CepProps) {
   const handleCep = useMutation({
      mutationFn: ObtemEnderecoCep,
      mutationKey: ['ObtemEnderecoCep'],
      onSuccess(data) {
         if (data) {
            setValue("bairro", data.bairro);
            setValue("cep", cepMask(data.cep));
            setValue("cidade", data.localidade);
            setValue("complemento", data.complemento);
            setValue("estado", data.uf);
            setValue("logradouro", data.logradouro);
         }
      }
   })

   return (
      <>
         <InputCep
            label='CEP'
            iconLeft={<Icon.Pin size={24} />}
            placeholder='00000-000'
            inputMode='numeric'
            handleCep={handleCep}
            control={control}
            error={error?.cep?.message}
            {...rest}
         />

         {!handleCep.isPending && !handleCep.isIdle && !handleCep.data?.logradouro && (
            <InputText
               label="Rua ou Logradouro"
               iconLeft={<Icon.Pin size={24} />}
               name='logradouro'
               editable={!handleCep.data?.logradouro}
               placeholder='Digite o estado'
               control={control}
               error={error?.logradouro?.message}
            />)
         }

         {!handleCep.isPending && !handleCep.isIdle && !handleCep.data?.bairro && (
            <InputText
               label="Bairro"
               iconLeft={<Icon.Pin size={24} />}
               name='bairro'
               editable={!handleCep.data?.bairro}
               placeholder='Digite seu bairro'
               control={control}
               error={error?.bairro?.message}
            />
         )}

         {!handleCep.isPending && !handleCep.isIdle && !handleCep.data?.localidade && (
            <InputText
               label="Cidade"
               iconLeft={<Icon.Pin size={24} />}
               name='cidade'
               editable={!handleCep.data?.localidade}
               placeholder='Digite sua cidade'
               control={control}
               error={error?.cidade?.message}
            />
         )}

         {!handleCep.isPending && !handleCep.isIdle && !handleCep.data?.complemento && (
            <InputText
               label="Complemento"
               iconLeft={<Icon.Pin size={24} />}
               name='complemento'
               editable={!handleCep.data?.complemento}
               placeholder='Digite o complemento'
               control={control}
               error={error?.complemento?.message}
            />
         )}

         {!handleCep.isPending && !handleCep.isIdle && !handleCep.data?.uf && (
            <InputSelecionar
               placeholder='Estado onde moro'
               label='Estado'
               name={`estado`}
               control={control}
               option={estadosBrasileiros}
               error={error?.estado?.message}
            />
         )}
      </>
   );
}

export function CriarConta() {
   const { width } = Dimensions.get("screen");
   const { control, handleSubmit, formState: { errors }, reset, setValue
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
         console.log(JSON.stringify(form, null, 1));
         return Promise.reject();
         return criaUsuario({ ...form, username: form.email });
      },
      mutationKey: ['criaUsuario'],
      onSuccess(data) {
         console.log(JSON.stringify(data, null, 1))
      },
      onError(error) {
         console.log(JSON.stringify(error, null, 1))
      },
   });

   const size = width >= 1024 ? "80%" : "100%";

   return (
      <Layout.Root>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm" alignSelf='center' width={size}>
                  <VStack gap="lg" flex={1}>

                     <Header />

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

                     <Cep
                        name='cep'
                        setValue={setValue}
                        control={control}
                        error={errors}
                        reset={reset}
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
