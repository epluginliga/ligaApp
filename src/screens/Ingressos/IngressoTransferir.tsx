import React, { useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, View } from 'react-native';

import HStack from '../../components/Views/Hstack';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import Circle from '../../components/Views/Circle';

import { cpfMask } from '../../utils/Maskara';
import { Icon } from '../../icons';
import { Validacoes } from '../../utils/Validacoes';
import { bilheteTransferir } from '../../services/bilhete';
import { RouteApp } from '../../@types/navigation';
import { PayloadDefaultResponse } from '../../services/@index';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { Section } from '../../components/Section';

import { CPF } from '@env';
import { z } from 'zod';

function Sucesso({ data }: { data: PayloadDefaultResponse }) {
   const { colors } = useTheme<Theme>();

   if (!data) return;

   return (
      <VStack flex={1} alignContent='center' justifyContent='center'>

         <Section.Root flex={1}>
            <HStack alignItems='center' position='relative'>
               <Icon.CheckCircle size={28} color={colors.greenDark} />
               <Section.Title>
                  Ingresso transferido
               </Section.Title>
            </HStack>

            <Section.SubTitle>{data.mensagem}</Section.SubTitle>
         </Section.Root>
      </VStack>
   )
}

function Error({ data }: { data?: string }) {
   if (!data) return;

   return (
      <VStack alignContent='center' justifyContent='center'>
         <Animated.View
            entering={FadeIn}
            exiting={FadeOut}>
            <VStack alignContent='center' justifyContent='center'>

               <Section.Root >
                  <HStack justifyContent='center' alignItems='center' position='relative'>
                     <VStack backgroundColor='primary' borderRadius={100} p='xs'>
                        <Icon.X size={26} color="white" />
                     </VStack>
                     <Section.Title>
                        Um erro aconteceu!
                     </Section.Title>
                  </HStack>

                  <Section.SubTitle textAlign='center' color='primary'>{data}</Section.SubTitle>
               </Section.Root>
            </VStack>
         </Animated.View>
      </VStack>
   )
}

const schema = z.object({
   destinatario_cpf: z.string({ message: "Obrigatório!" }).superRefine((val, ctx) => {
      if (!Validacoes.CPF(val)) {
         ctx.addIssue({
            code: "custom",
            message: "CPF inválido",
         })
      }
   }),
});

type IForm = z.input<typeof schema>;
type IngressoTransferiRouteProp = RouteProp<RouteApp, 'IngressoTranserir'>;

export function IngressoTransferir() {
   const insets = useSafeAreaInsets();
   const { goBack } = useNavigation();
   const { params } = useRoute<IngressoTransferiRouteProp>();

   const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
      resolver: zodResolver(schema),
      defaultValues: {
         destinatario_cpf: CPF
      }
   });

   const handleCloseModal = useCallback(() => {
      const time = setTimeout(() => goBack(), 2000);
      return () => clearTimeout(time);
   }, []);

   console.log(params.ingresso_id)

   const onSubmit = useMutation({
      mutationKey: ['bilheteTransferir'],
      mutationFn: (body: IForm) => bilheteTransferir({
         bilhete_id: params.ingresso_id,
         body: {
            destinatario_cpf: body.destinatario_cpf.replace(/\D/g, ''),
         }
      }),
      onSuccess: () => handleCloseModal(),
   });

   const erro: any = onSubmit?.error;

   return (
      <Layout.Scroll contentContainerStyle={{ flexGrow: 1 }}>
         <HStack m="sm" justifyContent="flex-end">
            <Pressable
               onPress={goBack}>
               <Circle
                  variant="shadow"
                  width={30}
                  height={30}
                  marginVertical="sm"
                  justifyContent="center"
               >
                  <Icon.X />
               </Circle>
            </Pressable>
         </HStack>

         <VStack justifyContent='space-between' flex={1} mx='sm' gap='md'>
            <VStack gap='md'>
               <InputText
                  inputMode='search'
                  onSubmitEditing={handleSubmit((data) => onSubmit.mutate(data))}
                  label="CPF"
                  iconLeft={<Icon.User size={20} />}
                  name='destinatario_cpf'
                  mask={cpfMask}
                  placeholder='Digite o CPF do novo utilizador'
                  control={control}
                  error={errors?.destinatario_cpf?.message}
               />
            </VStack>

            {onSubmit.data ? <Sucesso data={onSubmit.data} /> : <Error data={erro?.response?.data?.mensagenserro.join('\n')} />}

            <View style={{ justifyContent: "flex-end", marginBottom: insets.bottom + 8 }}>
               <Button
                  loading={onSubmit.isPending}
                  onPress={handleSubmit((data) => onSubmit.mutate(data))}>
                  Transferir
               </Button>
            </View>
         </VStack>
      </Layout.Scroll>
   )
}