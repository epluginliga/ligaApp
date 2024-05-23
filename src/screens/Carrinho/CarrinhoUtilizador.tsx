import React from 'react'
import { useForm } from 'react-hook-form'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import { formataData } from '../../utils/utils'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'
import { data } from '../../../store/eventoId';
import HStack from '../../components/Views/Hstack'
import Text from '../../components/Text'
import { ModalApp } from '../../components/Modal'
import { InputText } from '../../components/Inputs/Text'

import { Input } from '../../components/Inputs'
import { FlatList, ImageBackground, Platform, Pressable, StatusBar } from 'react-native'
import Circle from '../../components/Views/Circle'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { StatusBarApp } from '../../components/StatusBarApp'

const schema = z.object({
   atletica: z.string()
});
type Form = z.input<typeof schema>;

function Atletica() {
   const { control, formState: { errors } } = useForm<Form>({
      resolver: zodResolver(schema)
   });

   return (
      <ModalApp handleOpen={(
         <Input>
            <HStack alignItems='center' justifyContent='space-between' width="100%">
               <Text>Selecione uma atlética</Text>
               <Icon.Down />
            </HStack>
         </Input>
      )}>
         <FlatList
            stickyHeaderHiddenOnScroll={false}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            data={new Array(20).fill(null)}
            ListHeaderComponent={(
               <VStack marginBottom='sm' flex={1} gap='md' >
                  <InputText
                     placeholder='Selecione a atlética'
                     control={control}
                     name='atletica'
                     error={errors?.atletica?.message}
                  />
               </VStack>
            )}
            ItemSeparatorComponent={() => <HStack borderBottomColor='bege' opacity={0.1} borderWidth={1} />}
            renderItem={({ item }) => (
               <Pressable onPress={() => console.log(item)}>
                  <HStack padding='sm'>
                     <Text variant='body'>Canibal</Text>
                  </HStack>
               </Pressable>
            )}
         />
      </ModalApp>
   );
}

const schemaUtilizador = z.object({
   matricula: z.string(),
   nome: z.string(),
   cpf: z.string(),
   data_nascimento: z.string(),
   email: z.string(),
});

type FormUtilizador = z.input<typeof schemaUtilizador>;
function FormUtilizador() {

   const { control, formState: { errors } } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador)
   });

   return (

      <VStack gap='md' >
         <Atletica />

         <Text variant='header'>Utilizador dos ingressos</Text>

         <Section.Root >
            <HStack alignItems='center' mb='md'>
               <Circle variant='shadow'
                  width={25}
                  height={25}
               />
               <Text variant='labelInput'>Esse ingresso é pra mim</Text>
            </HStack>

            <InputText
               label='Matrícula'
               control={control}
               name='matricula'
               placeholder='Matrícula do dono(a) do ingresso'
               error={errors?.nome?.message}
            />

            <InputText
               label='Nome'
               control={control}
               name='nome'
               placeholder='Nome completo do utilizador'
               error={errors?.nome?.message}
            />

            <InputText
               label='CPF'
               control={control}
               name='cpf'
               placeholder='000.000.000-00'
               error={errors?.cpf?.message}
            />

            <InputText
               label='Data de nascimento'
               control={control}
               name='data_nascimento'
               placeholder='00/00/0000'
               error={errors?.data_nascimento?.message}
            />

            <InputText
               label='E-mail'
               control={control}
               name='data_nascimento'
               placeholder='Digite um e-mail válido'
               error={errors?.data_nascimento?.message}
            />


         </Section.Root>
         <Button marginHorizontal="md">Continuar</Button>
      </VStack>

   )
}

export function CarrinhoUtilizador() {
   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Root>

            <Layout.Keyboard>
               <Layout.Header title='Ingressos disponíveis' />
               <Layout.Scroll>

                  <VStack gap="lg" m='sm' marginBottom='md'>

                     <Section.Root>
                        <Section.Title>{data.nome}</Section.Title>

                        <Section.SubTitle iconLeft={<Icon.Calendario />}>
                           {formataData(data.data_evento).DiaMesAnoTexto()}
                        </Section.SubTitle>

                        <Section.SubTitle iconLeft={<Icon.Clock />}>
                           {formataData(data.data_evento).hora()}
                        </Section.SubTitle>

                        <VStack gap="xs">
                           <Section.SubTitle iconLeft={<Icon.Pin />}>
                              {data.nome_local + '\n'}
                              <Section.Span>
                                 {data.logradouro}
                              </Section.Span>
                           </Section.SubTitle>
                        </VStack>

                     </Section.Root>

                     <FormUtilizador />

                  </VStack>

               </Layout.Scroll>

            </Layout.Keyboard>

         </Layout.Root>

      </>
   )
}
