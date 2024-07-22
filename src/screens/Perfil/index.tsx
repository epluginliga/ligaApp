import React, { useState } from 'react'

import { ActivityIndicator, FlatList, Image, Pressable } from 'react-native';

import { Layout } from '../../components/Views/Layout';
import { Section } from '../../components/Section';
import VStack from '../../components/Views/Vstack';
import HStack from '../../components/Views/Hstack';

import { Icon } from '../../icons';
import { useAuth } from '../../hooks/auth';

import { Theme } from '../../theme/default';
import { useTheme } from '@shopify/restyle';
import { DiamontDown } from '../../icons/Diamont';
import { ModalSmall } from '../../components/Modal/ModalSmall';
import { Card } from '../../components/Card';
import Text from '../../components/Text';
import { useMutation, useQuery } from '@tanstack/react-query';
import { obtemDadosLogado, usuarioExcluirConta } from '../../services/perfil';
import { useNavigation } from '@react-navigation/native';

function Item({ item }: any) {
   if (item.route) {
      return (
         <Pressable onPress={() => {
            if (item?.disabled) return;

            item.route();
         }}>
            <HStack opacity={item.disabled ? .4 : 1} paddingHorizontal='md' backgroundColor='bege' gap='md' py='md' alignItems='center' justifyContent='space-between'>
               <VStack>
                  {item.icone}
               </VStack>
               <VStack flex={1}>
                  <Section.Title>{item.nome}</Section.Title>
                  <Section.SubTitle color='bege_900'>{item.descricao}</Section.SubTitle>
               </VStack>
               <Icon.ArrowRight />
            </HStack>
         </Pressable >
      )
   }

   return (
      <>
         {item.handleAction && item.handleAction}
      </>
   )
}

const bg: { [key: string]: 'greenLight' | 'warning' } = {
   'aguardando_aprovacao': 'warning',
   'aprovado': 'greenLight',
};

function Header() {
   const { colors } = useTheme<Theme>();
   const { user } = useAuth();
   const { data, isFetching } = useQuery({
      queryFn: obtemDadosLogado,
      queryKey: ['obtemDadosLogadoIndex']
   });

   if (isFetching) {
      return;
   }

   const corStatus = data?.status_aprovacao && bg[data?.status_aprovacao] || 'bege';

   return (
      <VStack
         justifyContent='center'
         alignItems='center'
         mb='lg'
         mx='sm'
         gap='xs'
      >
         <VStack
            borderRadius={100}
            backgroundColor={corStatus}
            width={100}
            height={100}
            mb='sm'
            justifyContent='center'
            alignItems='center'
            position='relative'>
            <Image
               style={{ height: 90, width: 90, borderRadius: 100 }}
               source={{ uri: data?.path_avatar }}
            />
            <VStack position='absolute' bottom={0} left="75%">
               <Icon.CheckCircle color={colors[corStatus]} />
            </VStack>
         </VStack>
         <VStack alignItems='center'>
            <Section.Title>{user.nome}</Section.Title>
            <Section.Span>{data?.user_name}</Section.Span>
         </VStack>
      </VStack>
   )
}

function ContaExcluidaSucesso({ children }: { children: React.ReactNode }) {
   const { colors } = useTheme<Theme>()

   return (
      <VStack justifyContent='center' alignItems='center' gap='lg' p='md'>
         <VStack borderColor='greenDark' borderWidth={1} borderRadius={100} padding='sm'>
            <Icon.CheckCircle color={colors.greenDark} size={30} />
         </VStack>

         <Text variant='header' color='greenDark' textAlign='center'>Registro excluido com sucesso</Text>

         {children}
      </VStack>
   )
}

function ContaExcluidaErro({ children }: { children: React.ReactNode }) {
   return (
      <>
         <VStack alignItems='center' gap='sm' p='md'>

            <VStack borderColor='primary' borderWidth={1} borderRadius={100} padding='sm'>
               <Icon.X size={30} />
            </VStack>


            <VStack alignItems='center' mb='xs'>
               <Card.Title>Exclusão de conta</Card.Title>
               <Card.SubTitle textAlign='center'>
                  Deseja realmente excluir sua conta?
               </Card.SubTitle>
            </VStack>

            <Card.SubTitle textAlign='center' fontWeight="300">
               Essa ação não poderá ser revertida.
               {'\n'}Você perderá o acesso a todos os históricos de compras, ingressos e outros.
            </Card.SubTitle>
         </VStack>
         {children}
      </>
   );
}


function BotaoExcluirConta() {
   const [mostraModal, setMostraModal] = useState(false);
   const { user, signOut } = useAuth();

   const handleExcluiConta = useMutation({
      mutationFn: usuarioExcluirConta,
      onSuccess() {
         const time = setTimeout(() => {
            setMostraModal(false);
            signOut();
         }, 2000);
         return () => clearTimeout(time);
      }
   });

   return (
      <>
         <Pressable onPress={() => setMostraModal(true)}>
            <HStack paddingHorizontal='md' backgroundColor='bege' gap='md' py='md' alignItems='center' justifyContent='space-between'>
               <VStack>
                  <Icon.Trash size={20} />
               </VStack>
               <VStack flex={1}>
                  <Section.Title>Excluir conta</Section.Title>
                  <Section.SubTitle color='bege_900'>Exclua sua conta no aplicativo</Section.SubTitle>
               </VStack>
               <Icon.ArrowRight />
            </HStack>
         </Pressable>

         <ModalSmall
            minHeight="40%"
            maxHeight={250}
            ativo={mostraModal}>
            {handleExcluiConta.data ? (
               <ContaExcluidaSucesso>
                  <VStack justifyContent='center' alignItems='center'>
                     <Pressable
                        onPress={() => setMostraModal(false)}>
                        <HStack alignItems='center'
                           justifyContent='center'
                           backgroundColor='greenDark'
                           py='sm'
                           p='xs'
                           borderRadius={10}
                           px='md'>

                           <Text color='white' variant='botaoLink'>
                              Desconectando.. {' '} <ActivityIndicator size="small" color="#fff" />
                           </Text>
                        </HStack>
                     </Pressable>
                  </VStack>
               </ContaExcluidaSucesso>

            ) : (
               <ContaExcluidaErro >
                  <HStack justifyContent='space-between' gap='md'>
                     <Pressable
                        onPress={() => setMostraModal(false)}
                        style={{ flex: 1 }}>
                        <HStack alignItems='center' justifyContent='center' backgroundColor='greenDark' py='sm' p='xs' borderRadius={10} px='md'>
                           <Icon.CheckCircle size={14} color='#fff' />
                           <Text color='white' variant='botaoLink'>Cancelar</Text>
                        </HStack>
                     </Pressable>
                     <Pressable style={{ flex: 1 }}
                        onPress={() => handleExcluiConta.mutate(user.id)}
                     >
                        <HStack alignItems='center' justifyContent='center' backgroundColor='primary' py='sm' p='xs' borderRadius={10} px='md'>
                           {!handleExcluiConta.isPending ? (
                              <>
                                 <Icon.Trash size={12} color='#fff' />
                                 <Text color='white' variant='botaoLink'>
                                    Excluir
                                 </Text>
                              </>
                           ) : (
                              <ActivityIndicator size="small" color="#fff" />
                           )}

                        </HStack>
                     </Pressable>
                  </HStack>
               </ContaExcluidaErro>


            )}
         </ModalSmall >
      </>
   )
}

export function Perfil() {
   const { signOut } = useAuth();
   const { navigate } = useNavigation();

   const menuPerfil = [
      {
         nome: 'Meu Perfil',
         icone: <Icon.User />,
         route: () => navigate("PerfilMeuPerfil"),
         descricao: 'Confira e altere suas informações'
      },
      {
         nome: 'Meu Endereço',
         icone: <Icon.Pin size={30} />,
         route: () => navigate("PerfilMeusEndereco"),
         descricao: 'Confira altere seu endereço'
      },
      {
         nome: 'Meus Pedidos',
         icone: <Icon.Ticket />,
         route: () => navigate("PerfilMeusPedidos"),
         descricao: 'Visualize seu histórico de pedidos',
         disabled: true
      },
      {
         nome: 'Alterar senha',
         icone: <Icon.FingerPrint size={27} />,
         route: () => navigate("PerfilAlterarSenha"),
         descricao: 'Altere sua senha de acesso'
      },
      {
         descricao: 'Encerre sua sessão',
         icone: <Icon.ArrowLeftStart />,
         route: () => signOut(),
         nome: "Sair",
      },
      {
         nome: "Excluir conta",
         handleAction: <BotaoExcluirConta />,
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
