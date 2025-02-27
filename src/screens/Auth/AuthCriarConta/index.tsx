import React, { useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';

import { Layout } from '../../../components/Views/Layout';
import { Button } from '../../../components/Button';
import { Icon } from '../../../icons';
import VStack from '../../../components/Views/Vstack';
import { InputText } from '../../../components/Inputs/Text';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IconFingerPrint } from '../../../icons/IconFingerPrint';
import { InputPassword } from '../../../components/Inputs/Password';
import { useMutation } from '@tanstack/react-query';
import { criaUsuario } from '../../../services/usuario';
import { cepMask, cpfMask, dataMask, telefoneMask } from '../../../utils/Maskara';
import { CriaUsuarioProps } from '../../../services/@usuario';
import { InputSelecionar } from '../../../components/Inputs/Selecionar';
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
import { ActivityIndicator, Dimensions } from 'react-native';
import { InputCep } from '../../../components/Inputs/inputCep';
import { ObtemEnderecoCep } from '../../../services/sercicosExternos';
import { Input, InputDefault } from '../../../components/Inputs';
import { estadosBrasileiros } from '../../../utils/estadosBrasileiros';
import { AvatarUsuario } from '../../../components/AvatarUsuario';
import Text from '../../../components/Text';
import theme from '../../../theme/default';
import { AuthCriarContaFoto } from './AuthCriarContaFoto';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
   setValue: any
}
function Header({ ...rest }: HeaderProps) {
   const [rota, setRota] = useState<"AuthCriarContaFoto" | "">();

   if (rota === "AuthCriarContaFoto") return <AuthCriarContaFoto {...rest} />

   return (
      <VStack flex={1} alignItems='center' justifyContent='center' height="auto">
         <AvatarUsuario onPress={() => setRota("AuthCriarContaFoto")} >
            <Text variant='labelInput' fontWeight="400">*Envie sua foto para reconhecimento facial</Text>
         </AvatarUsuario>
      </VStack>
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
   data_nascimento: z.string(),
   password: z.string(),
   confirmar_senha: z.string(),
   cadastro_app: z.boolean().optional(),
   cep: z.string(),
   bairro: z.string(),
   cidade: z.string(),
   estado: z.string(),
   logradouro: z.string(),
   numero: z.string().optional(),
   path_camera_web: z.boolean(),
   path_avatar_camera: z.string(),
   tipo_imagem_camera: z.string(),
   habilitar_endereco: z.number(),
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
            setValue("estado", data.uf);
            setValue("logradouro", data.logradouro);
         }
      }
   })

   return (
      <>
         {handleCep.isPending ? (
            <Input label='CEP'>
               <ActivityIndicator size="small" color={theme.colors.primary} />
            </Input>
         ) : (
            <InputCep
               label='CEP'
               iconLeft={handleCep.isSuccess ? <Icon.CheckCircle color={theme.colors.greenDark} size={24} /> :<Icon.Pin size={24} />}
               placeholder='00000-000'
               inputMode='numeric'
               handleCep={handleCep}
               control={control}
               error={error?.cep?.message}
               {...rest}
            />
         )}

         {!handleCep.isPending && !handleCep.isIdle && !handleCep.data?.logradouro && (
            <InputText
               label="Rua ou Logradouro"
               iconLeft={<Icon.Pin size={24} />}
               name='logradouro'
               editable={!handleCep.data?.logradouro}
               placeholder='Rua xx...'
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

export function AuthCriarConta() {
   const navigate = useNavigation();
   const { width } = Dimensions.get("screen");
   const { control, handleSubmit, formState: { errors }, watch, resetField, setValue
   } = useForm<CriaUsuarioProps>({
      resolver: zodResolver(schema),
      defaultValues: {
         "nome": NOME,
         "password": PASSWORD,
         "email": EMAIL,
         "documento": DOCUMENTO,
         "telefone": TELEFONE,
         "sexo": SEXO,
         "data_nascimento": NASCIMENTO,
         "confirmar_senha": CONFIRMAR_SENHA,
         cadastro_app: false,
         numero: "000",
         habilitar_endereco: 1,
      }
   });

   const handleCriaConta = useMutation({
      mutationFn: (form: CriaUsuarioProps) => criaUsuario({ ...form, username: form.email }),
      mutationKey: ['criaUsuario'],
      onSuccess() {
         navigate.navigate("Login")
      },
   });

   const size = width >= 1024 ? "80%" : "100%";
   const { path_avatar_camera } = watch();

   if (!path_avatar_camera) {
      return (
         <Layout.Root>
            <Layout.Header title='Criar Conta' />
            <Header setValue={setValue} />
         </Layout.Root>
      )
   }

   return (
      <Layout.Root>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm" alignSelf='center' width={size}>

                  {path_avatar_camera && (
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
                           name='data_nascimento'
                           placeholder='dd/mm/yyyy'
                           mask={dataMask}
                           control={control}
                           inputMode='decimal'
                           maxLength={10}
                           error={errors?.data_nascimento?.message}
                        />

                        <Cep
                           name='cep'
                           setValue={setValue}
                           control={control}
                           error={errors}
                           reset={() => {
                              resetField("bairro");
                              resetField("cidade");
                              resetField("estado");
                              resetField("logradouro");
                           }}
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

                        <VStack gap="md">
                           <Button
                              loading={handleCriaConta.isPending}
                              onPress={handleSubmit((form => handleCriaConta.mutate(form)))}
                           >
                              CRIAR CONTA
                           </Button>
                        </VStack>
                     </VStack>
                  )}

               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>
      </Layout.Root>
   );
};
