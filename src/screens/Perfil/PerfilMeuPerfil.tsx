import React from 'react';
import { Layout } from '../../components/Views/Layout';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';
import { Icon } from '../../icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cpfMask, dataMask, telefoneMask } from '../../utils/Maskara';
import { InputSelecionar } from '../../components/Inputs/Selecionar';
import { Button } from '../../components/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { obtemDadosLogado, usuarioAtualiza } from '../../services/perfil';
import { Image, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/Text';

type HeaderProps = {
   status?: "aguardando_aprovacao" | "aprovado";
   uri?: string
}

const bg: { [key: string]: 'greenLight' | 'warning' } = {
   'aguardando_aprovacao': 'warning',
   'aprovado': 'greenLight',
};

const textoStatus: { [key: string]: string } = {
   'aguardando_aprovacao': 'Aguardando aprovação',
   'aprovado': 'Aprovado',
};
function Header({ status, uri }: HeaderProps) {
   const { colors } = useTheme<Theme>();
   
   if (!status) return;

   const background = status && bg[status] || 'bege';

   return (
      <VStack
         justifyContent='center'
         alignItems='center'
         mb='lg'
         gap='sm'
      >
         <VStack
            borderRadius={100}
            backgroundColor={background}
            width={130}
            height={130}
            mb='sm'
            justifyContent='center'
            alignItems='center'
            position='relative'>
            <Image
               style={{ height: 120, width: 120, borderRadius: 100 }}
               source={{ uri }}
            />
            <VStack position='absolute' bottom={0} left="75%">
               <Icon.CheckCircle color={colors[background]} />
            </VStack>
         </VStack>
         <Text variant='header2' color={background}>{textoStatus[status]}</Text>
      </VStack>
   )
}

const schema = z.object({
   name: z.string(),
   email: z.string().email({
      message: "Email inválido",
   }),
   documento_numero: z.string(),
   telefone_numero: z.string(),
   sexo: z.string(),
   data_nascimento: z.string(),
});

type EditaPerfilProps = z.input<typeof schema>;

export const PerfilMeuPerfil = () => {
   const insets = useSafeAreaInsets();
   const { data, isPending } = useQuery({
      queryFn: obtemDadosLogado,
      queryKey: ["obtemDadosLogado"]
   });

   const handleAtualizaPerfil = useMutation({
      mutationFn: (form: EditaPerfilProps) => usuarioAtualiza(data?.user_id || '', form),
      mutationKey: ['criaUsuario'],
      onSuccess(data) {
         console.log(JSON.stringify(data, null, 1))
      },
      onError(error) {
         console.log(JSON.stringify(error, null, 1))
      },
   });

   const { control, handleSubmit, formState: { errors }
   } = useForm<EditaPerfilProps>({
      resolver: zodResolver(schema),
      defaultValues: {
         ...data,
         documento_numero: data?.documento_tipo === "cpf" ? cpfMask(data.documento_numero) : data?.documento_numero,
         telefone_numero: data && `${telefoneMask(data.telefone_ddd + data.telefone_numero)}`
      }
   });

   if (isPending) return;

   return (
      <>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">

                  <Header uri={data?.path_avatar} status={data?.status_aprovacao} />

                  <VStack gap="lg" flex={1}>
                     <InputText
                        label="Nome"
                        iconLeft={<Icon.User size={24} />}
                        name='name'
                        placeholder='Digite seu nome'
                        control={control}
                        error={errors?.name?.message}
                     />

                     <InputText
                        editable={false}
                        label="E-mail"
                        iconLeft={<Icon.Envelope size={24} />}
                        name='email'
                        placeholder='seu@email.com'
                        control={control}
                        error={errors?.email?.message}
                        inputMode='email'
                     />

                     <InputText
                        editable={false}
                        label={data?.documento_tipo === "cpf" ? "CPF" : "RG"}
                        iconLeft={<Icon.AddressCard size={24} />}
                        name='documento_numero'
                        placeholder='xxx.xxx.xxx-xx'
                        control={control}
                        mask={cpfMask}
                        error={errors?.documento_numero?.message}
                        inputMode='decimal'
                     />

                     <InputText
                        editable={false}
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

                     <InputText
                        label="Telefone"
                        iconLeft={<Icon.PhoneFlipe size={24} />}
                        name='telefone_numero'
                        placeholder='(00) 00000-0000'
                        control={control}
                        error={errors?.telefone_numero?.message}
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

                  </VStack>

                  <VStack gap="md">
                     <Button
                        loading={handleAtualizaPerfil.isPending}
                        onPress={handleSubmit((form => handleAtualizaPerfil.mutate(form)))} >
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
