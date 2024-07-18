import React from 'react'

import { FlatList, Image, Pressable } from 'react-native';

import { Layout } from '../../components/Views/Layout';
import { Section } from '../../components/Section';
import VStack from '../../components/Views/Vstack';
import HStack from '../../components/Views/Hstack';

import { Icon } from '../../icons';
import { useAuth } from '../../hooks/auth';

import { Theme } from '../../theme/default';
import { useTheme } from '@shopify/restyle';
import { DiamontDown } from '../../icons/Diamont';

function Item({ item }: any) {
   return (
      <Pressable>
         <HStack paddingHorizontal='md' backgroundColor='bege' gap='md' py='md' alignItems='center' justifyContent='space-between'>
            <VStack>
               {item.icone}
            </VStack>
            <VStack flex={1}>
               <Section.Title>{item.nome}</Section.Title>
               <Section.SubTitle color='bege_900'>{item.descricao}</Section.SubTitle>
            </VStack>
            <Icon.ArrowRight />
         </HStack>
      </Pressable>
   )
}

function Header() {
   const { colors } = useTheme<Theme>();

   return (
      <VStack
         justifyContent='center'
         alignItems='center'
         mb='lg'
         gap='sm'
      >
         <VStack
            borderRadius={100}
            backgroundColor='greenLight'
            width={130}
            height={130}
            mb='sm'
            justifyContent='center'
            alignItems='center'
            position='relative'>
            <Image
               style={{ height: 120, width: 120, borderRadius: 100 }}
               source={{ uri: "https://files.deualiga.com.br/storage/imagens-aprovadas/f4bed55c_23c4_4455_9dfc_d1635645edd7.jpg" }}
            />
            <VStack position='absolute' bottom={0} left="75%">
               <Icon.CheckCircle color={colors.greenLight} />
            </VStack>
         </VStack>
         <VStack alignItems='center'>
            <Section.Title>Jean marcos vieira da silva</Section.Title>
            <Section.Span>jean.silva</Section.Span>
         </VStack>
      </VStack>
   )
}


export function Perfil() {
   const { signOut } = useAuth();


   const menuPerfil = [
      {
         nome: 'Meu Perfil',
         icone: <Icon.User />,
         route: 'perfil',
         descricao: 'Confira e altere suas informações'
      },
      {
         nome: 'Meu Endereço',
         icone: <Icon.Pin size={30} />,
         route: 'perfil_endereco',
         descricao: 'Confira altere seu endereço'
      },
      {
         nome: 'Meus Pedidos',
         icone: <Icon.Ticket />,
         route: 'perfil_pedidos',
         descricao: 'Visualize seu histórico de pedidos'
      },
      {
         nome: 'Alterar senha',
         icone: <Icon.FingerPrint size={27} />,
         route: 'perfil_alterar_senha',
         descricao: 'Visualize seu histórico de pedidos'
      },
      {
         descricao: 'Encerre sua sessão',
         icone: <Icon.ArrowLeftStart />,
         nome: "Sair",
         route: signOut,
      },
      {
         descricao: 'Exclua sua conta no aplicativo',
         icone: <Icon.Trash size={20} />,
         nome: "Excluir conta",
         route: signOut,
      }
   ];


   return (
      <>
         <Layout.Header title='Perfil' />

         <FlatList
            showsVerticalScrollIndicator={false}
            data={menuPerfil}
            keyExtractor={(item) => item.nome}
            ItemSeparatorComponent={() => <VStack borderBottomColor='bege_200' borderBottomWidth={1} />}
            ListHeaderComponent={<Header />}
            renderItem={Item}
            ListFooterComponent={(
               <>
                  <VStack backgroundColor='bege' alignItems='center' pt='lg' pb='sm'>
                     <Section.Span iconLeft={<Icon.Warning size={12} />}>Versao: 2.0.0</Section.Span>
                  </VStack>
                  <DiamontDown />
               </>
            )}
         />
      </>
   )
}
