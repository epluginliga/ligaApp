import React from 'react';
import { Layout } from '../../components/Views/Layout';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';
import { Icon } from '../../icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cpfMask, dataMask, telefoneMask } from '../../utils/Maskara';
import { InputSelecionar } from '../../components/Inputs/Selecionar';
import { Button } from '../../components/Button';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { obtemDadosLogado, usuarioAtualiza } from '../../services/perfil';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { AvatarUsuario } from '../../components/AvatarUsuario';
import { z } from 'zod';


const schema = z.object({
   nome: z.string(),
   email: z.string().email({
      message: "Email inválido",
   }),
   documento: z.string(),
   data_nascimento: z.string(),
   telefone: z.string(),
   sexo: z.string(),

   path_avatar: z.string().optional(),
   status_aprovacao: z.enum(["aguardando_aprovacao", "aprovado", "reprovado", "sem_imagem"]).optional(),
   user_id: z.string().optional(),
   documento_tipo: z.string().optional()
});

type EditaPerfilProps = z.input<typeof schema>;

const queryClient = new QueryClient()

export const PerfilMeuPerfil = () => {
   const insets = useSafeAreaInsets();
   const { goBack } = useNavigation();
   const { updateUsuario } = useAuth();

   const handleAtualizaPerfil = useMutation({
      mutationFn: (form: EditaPerfilProps) => usuarioAtualiza(data?.user_id || '', {
         data_nascimento: form.data_nascimento,
         nome: form.nome,
         documento: form.documento,
         email: form.email,
         sexo: form.sexo,
         telefone: form.telefone
      }),
      mutationKey: ['usuarioAtualizaPerfil'],
      onSuccess() {
         queryClient.invalidateQueries({ queryKey: ['obtemDadosLogadoIndex'] })
         updateUsuario({ nome: getValues("nome") })
         goBack()
      }
   });

   const { control, handleSubmit, formState: { errors }, getValues
   } = useForm<EditaPerfilProps>({
      resolver: zodResolver(schema),
      async defaultValues() {
         const user = await obtemDadosLogado()
         return {
            ...user,
            nome: user.name,
            documento: user?.documento_tipo === "cpf" ? cpfMask(user.documento_numero) : user?.documento_numero,
            telefone: user && `${telefoneMask(user.telefone_ddd + user.telefone_numero)}`
         }
      },
   });

   const data = getValues();

   return (
      <>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">

                  <AvatarUsuario usuario={data} />

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
                        name='documento'
                        placeholder='xxx.xxx.xxx-xx'
                        control={control}
                        mask={cpfMask}
                        error={errors?.documento?.message}
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
