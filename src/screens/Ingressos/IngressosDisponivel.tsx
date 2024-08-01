import React, { useRef } from 'react'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Platform, Pressable, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import VStack from '../../components/Views/Vstack'
import { Card } from '../../components/Card'
import { Icon } from '../../icons'
import Text from '../../components/Text'
import { Layout } from '../../components/Views/Layout'
import { dataApp } from '../../utils/utils'
import { ListEmptyComponent } from '../../components/ListEmptyComponent'
import { IngressosPayload } from '../../services/@eventos'
import HStack from '../../components/Views/Hstack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProximoIngressoComprado } from '../../services/eventos'
import { format, isAfter } from 'date-fns'
import { RefreshControl } from 'react-native-gesture-handler'
import { useTheme } from '@shopify/restyle'
import theme, { Theme } from '../../theme/default'
import { ModalSmallButton, ModalSmallButtonAction } from '../../components/Modal/ModalSmall';
import { devolverIngresso } from '../../services/bilhete';
import { Section } from '../../components/Section';
import { useAuth } from '../../hooks/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconeTipoIngresso = {
   [key: number]: {
      icon: React.ReactNode,
      nome: string;
   }
};
const iconeTipoIngresso: IconeTipoIngresso = {
   0: {
      icon: <Icon.QRCode size={16} />,
      nome: "Entrada por QR Code",
   },
   1: {
      icon: <Icon.FaceID size={16} />,
      nome: "Entrada por reconhecimento facial",
   }
}

type BotaoTransferirProps = TouchableOpacityProps & {
   item: IngressosPayload
}
function BotaoTransferir({ item, ...rest }: BotaoTransferirProps) {
   const dataLimite = format(item.evento_data_limite_transferencia, "yyyy-MM-dd'T'HH:mm:ss");

   if (!item.pode_transferir) return;
   if (!item.bilhete_permite_transferencia) return;
   if (!item.usuario_dono) return;
   if (isAfter(new Date(), dataLimite)) return;
   if (item.vezes_utilizado) return;

   return (
      <TouchableOpacity {...rest}>
         <HStack backgroundColor='greenDark' paddingHorizontal='md' py='xs' borderRadius={6}>
            <Text textAlign='center' color='white' variant='header3'>
               Transferir
            </Text>
         </HStack>
      </TouchableOpacity>
   )
}

type BotaoDevolverProps = TouchableOpacityProps & {
   item: IngressosPayload
}

export function IngressosDisponivel() {
   const navigate = useNavigation();
   const { colors } = useTheme<Theme>();
   const modalDevolverPedido = useRef<ModalSmallButtonAction>(null);
   const queryClient = useQueryClient();
   const { user } = useAuth();
   const insets = useSafeAreaInsets();

   const { data, refetch } = useQuery({
      queryKey: ['ingressosFuturosComprados'],
      queryFn: fetchProximoIngressoComprado,
   });

   const handleDevolverIngresso = useMutation({
      mutationFn: devolverIngresso,
      onSuccess() {
         queryClient.invalidateQueries({ queryKey: ['ingressosFuturosComprados'] })
         modalDevolverPedido.current?.close();
      },
   });

   function BotaoDevolver({ item }: BotaoDevolverProps) {
      const mostrar = !item.pode_transferir &&
         !item.usuario_dono &&
         item.bilhete_permite_transferencia;

      if (!mostrar) return;

      return (
         <>
            <ModalSmallButton
               ref={modalDevolverPedido}
               openModal={(
                  <HStack backgroundColor='primary' paddingHorizontal='md' py='xs' borderRadius={6}>
                     <Text textAlign='center' color='white' variant='header3'>
                        Devolver
                     </Text>
                  </HStack>
               )}
            >
               <VStack>
                  <Section.Title>Atenção</Section.Title>
                  <Section.SubTitle>Deseja realemente devolver o ingresso?</Section.SubTitle>
               </VStack>

               <HStack width="100%" paddingHorizontal='md' justifyContent='space-between'>
                  <Pressable onPress={() => handleDevolverIngresso.mutate(item.bilhete_id)}>
                     <HStack alignItems='center' backgroundColor='bege' p='sm' borderRadius={10}>
                        <Icon.ArrowPath size={14} color={theme.colors.primary} />
                        <Text variant='botaoLink' color='primary'>Devolver</Text>
                     </HStack>
                  </Pressable>

                  <Pressable onPress={() => modalDevolverPedido.current?.close()}>
                     <HStack alignItems='center' backgroundColor='bege' p='sm' borderRadius={10}>
                        <Icon.ArrowLeftCircle size={14} color={theme.colors.greenDark} />
                        <Text variant='botaoLink' color='greenDark'>Voltar</Text>
                     </HStack>
                  </Pressable>
               </HStack>

            </ModalSmallButton>
         </>
      )
   }

   function Item({ item }: { item: IngressosPayload }) {
      const dataISO = dataApp().converteDataBRtoISO(item.evento_data_evento)
      const dataEvento = dataApp(dataISO);

      const usuarioRecebedor = !item.pode_transferir &&
         item.usuario_dono &&
         item.cpf_compra != item.cpf_dono_original;

      return (
         <Card.Root marginHorizontal="sm" pr="xs">
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item?.evento_path_imagem }}
            />

            <VStack flex={1.6} justifyContent='space-around'>
               <Card.Title fontSize={18} lineHeight={22.5} my='sm'>{item.evento_nome}</Card.Title>

               <VStack gap='sm'>
                  <VStack maxWidth="92%">
                     <Card.SubTitle leftIcon={<Icon.Calendario size={16} />} >
                        {dataEvento.diaSemana()}
                        {`, ${dataEvento.diaMes()} de ${dataEvento.nomeFullMes()}`}
                     </Card.SubTitle>
                  </VStack>

                  <Card.Span leftIcon={<Icon.Pin size={16} />}>
                     {item.evento_cidade} | {item.evento_estado} - {dataEvento.hora() || 'hora não definida'}
                  </Card.Span>

                  <Card.Span leftIcon={iconeTipoIngresso[item.ingresso_necessario_aprovacao_imagem].icon}>
                     {iconeTipoIngresso[item.ingresso_necessario_aprovacao_imagem].nome}
                  </Card.Span>

                  {usuarioRecebedor && (
                     <Card.Span leftIcon={<Icon.ArrowPath />}>
                        Ingresso transferido para: {'\n'}
                        <Card.Span color='azul' fontWeight="500">{item.nome_compra}</Card.Span>
                     </Card.Span>
                  )}
               </VStack>

               <HStack alignItems='flex-start' mr='xs' justifyContent='space-evenly' marginVertical='sm' mt='md'>
                  <BotaoTransferir
                     item={item}
                     onPress={() => navigate.navigate("IngressoTranserir", {
                        ingresso_id: item.bilhete_id
                     })}
                  />
                  <BotaoDevolver
                     id={item.bilhete_id}
                     item={item}
                  />

                  {!item.ingresso_necessario_aprovacao_imagem ? (
                     <Pressable onPress={() => navigate.navigate("IngressosDetalhe", {
                        bilhete_id: item.bilhete_id,
                     })}>
                        <HStack backgroundColor='black' paddingHorizontal='md' py='xs' borderRadius={6}>
                           <Text textAlign='center' color='white' variant='header3'>
                              Informações
                           </Text>
                        </HStack>
                     </Pressable>
                  ) : null}
               </HStack>

            </VStack>
         </Card.Root>
      )
   }

   if (!data) return;

   const ingressosDisponiveis = data.data?.filter(item => user.documento === item.cpf_compra);
   const marginBottom = insets.bottom + (Platform.OS === "ios" ? 80 : 100);

   return (
      <Animated.View
         entering={FadeInRight}
         exiting={FadeOutRight}
         style={[{ flex: 1 }]}
      >
         <Layout.Header title='Ingressos disponíveis' />

         <FlatList
            contentContainerStyle={{ marginTop: 16 }}
            refreshControl={
               <RefreshControl
                  tintColor={colors.primary}
                  refreshing={false}
                  onRefresh={refetch}
               />
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ListEmptyComponent title='Nenhum Ingresso disponível' />}
            renderItem={Item}
            keyExtractor={(item) => item.bilhete_id}
            ItemSeparatorComponent={() => <VStack height={20} />}
            ListFooterComponent={<View style={{ marginBottom }} />}
            data={ingressosDisponiveis}
         />
      </Animated.View>

   )
}
