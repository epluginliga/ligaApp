import React from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'
import { data } from '../../../store/eventoId';
import HStack from '../../components/Views/Hstack'
import Text from '../../components/Text'
import { ModalApp } from '../../components/Modal'
import { InputText } from '../../components/Inputs/Text'
import { Input } from '../../components/Inputs'
import Circle from '../../components/Views/Circle'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { formataData } from '../../utils/utils'
import { Card } from '../../components/Card'
import { ResumoPedido } from '../../components/ResumoPedido'

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
   const { navigate } = useNavigation();

   const { control, formState: { errors } } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador)
   });

   return (

      <VStack gap='md' >

         <Card.Root>
            <Atletica />
         </Card.Root>

         <Section.Root>
            <Section.Title>Utilizador dos ingressos</Section.Title>

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

         <Button onPress={() => navigate('CarrinhoResumo')}
            marginHorizontal="md">
            Continuar
         </Button>
      </VStack>

   )
}

export function CarrinhoUtilizador() {
   return (
      <>
         {/* <StatusBar barStyle="dark-content" /> */}
         <Layout.Keyboard>
            <Layout.Root>
               <Layout.Header title='Utilizador' />
               <Layout.Scroll>
                  <VStack gap="lg" marginBottom='md'>
                     <ResumoPedido data={data} />
                     <FormUtilizador />
                  </VStack>
               </Layout.Scroll>
            </Layout.Root>
         </Layout.Keyboard>
      </>
   )
}
