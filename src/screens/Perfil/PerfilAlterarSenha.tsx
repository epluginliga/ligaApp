import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Layout } from '../../components/Views/Layout';
import VStack from '../../components/Views/Vstack';
import { Button } from '../../components/Button';

import { usuarioAlteraSenha } from '../../services/perfil';
import { z } from 'zod';
import { InputPassword } from '../../components/Inputs/Password';
import { IconFingerPrint } from '../../icons/IconFingerPrint';

const schema = z.object({
   senhaatual: z.string(),
   novasenha: z.string(),
   confirmar_senha: z.string(),
}).superRefine(({ confirmar_senha, novasenha }, ctx) => {
   if (novasenha !== confirmar_senha) {
      ctx.addIssue({
         code: 'custom',
         message: 'Senhas devem ser iguais',
         path: ['confirmar_senha']
      })
   }
});

type FormProps = z.input<typeof schema>;

export const PerfilAlterarSenha = () => {
   const insets = useSafeAreaInsets();
   const { goBack } = useNavigation();

   const handleAction = useMutation({
      mutationFn: (form: FormProps) => usuarioAlteraSenha(form),
      mutationKey: ['criaUsuario'],
      onSuccess() {
         goBack()
      }, onError(error) {
         console.log(JSON.stringify(error, null, 1))
      },
   });

   const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
      resolver: zodResolver(schema),
   });

   return (
      <>
         <Layout.Keyboard>

            <Layout.Header title='Criar Conta' />

            <Layout.Scroll>
               <VStack gap="lg" p="sm">

                  <VStack gap="lg" flex={1}>
                     <InputPassword
                        label="Senha atual"
                        iconLeft={<IconFingerPrint size={24} />}
                        name='senhaatual'
                        placeholder='Digite a senha atual'
                        control={control}
                        error={errors?.senhaatual?.message}
                     />

                     <InputPassword
                        label="Senha"
                        iconLeft={<IconFingerPrint size={24} />}
                        name='novasenha'
                        placeholder='Escolha uma senha segura'
                        control={control}
                        error={errors?.novasenha?.message}
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
                        loading={handleAction.isPending}
                        onPress={handleSubmit((form => {
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
