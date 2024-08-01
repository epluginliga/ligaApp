import React from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';

import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import VStack from '../../components/Views/Vstack';
import { Card } from '../../components/Card';
import { Icon } from '../../icons';
import { Layout } from '../../components/Views/Layout';
import { dataApp } from '../../utils/utils';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';
import { IngressosPayload } from '../../services/@eventos';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchIngressoComprado } from '../../services/eventos';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { format } from 'date-fns';

function Item({ item }: { item: IngressosPayload }) {
   const dataISO = dataApp().converteDataBRtoISO(item.evento_data_evento)
   const dataEvento = dataApp(dataISO);

   const usuarioRecebedor = !item.pode_transferir &&
      item.usuario_dono &&
      item.cpf_compra != item.cpf_dono_original;

   return (
      <Card.Root
         marginHorizontal="sm"
         pr="xs"
         opacity={0.7}
      >
         <Card.Image
            flex={1}
            height={88}
            source={{ uri: item?.evento_path_imagem }}
         />

         <VStack py='md' flex={2} justifyContent='space-around' pr='sm'>
            <Card.Title fontSize={18} lineHeight={22.5} my='xs'>
               {item.evento_nome}
            </Card.Title>

            <VStack gap='sm'>
               <Card.Span leftIcon={<Icon.Calendario size={16} />} >
                  {dataEvento.diaSemana()}{`, ${dataEvento.diaMes()} de ${dataEvento.nomeFullMes()}`}
               </Card.Span>

               <Card.Span leftIcon={<Icon.Pin size={16} />}>
                  {item.evento_cidade} | {item.evento_estado} - {dataEvento.hora() || 'hora não definida'}
               </Card.Span>
            </VStack>

            {usuarioRecebedor && (
               <Card.Span leftIcon={<Icon.ArrowPath />}>
                  Ingresso transferido para: {'\n'}
                  <Card.Span color='azul' fontWeight="500">{item.nome_compra}</Card.Span>
               </Card.Span>
            )}
         </VStack>
      </Card.Root>
   )
}

export function IngressosComprados() {
   const { colors } = useTheme<Theme>();
   const { data, refetch } = useQuery({
      queryKey: ['ingressosComprados'],
      queryFn: fetchIngressoComprado,
   });

   const insets = useSafeAreaInsets();

   if (!data) return null;

   const ingressosComprados = data.data?.filter(item => {
      const data = format(new Date(item.evento_data_evento_format_db), "yyyy-MM-d'T'HH:mm:ss");
      if (item.cpf_compra != item.cpf_dono_original) {
         return item;
      }

      return new Date(data).getTime() < new Date().getTime();
   });

   const marginBottom = insets.bottom + (Platform.OS === "ios" ? 80 : 100);
   
   return (
      <Animated.View
         entering={FadeInRight}
         exiting={FadeOutRight}
         style={[{ flex: 1 }]}
      >
         <Layout.Header
            title='Ingressos Comprados'
         />

         <FlatList
            contentContainerStyle={{
               marginTop: 16,
               marginBottom: 16,
            }}
            refreshControl={
               <RefreshControl
                  tintColor={colors.primary}
                  refreshing={false}
                  onRefresh={refetch}
               />
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               <ListEmptyComponent title='Nenhum Ingresso utilizado' />
            }
            renderItem={Item}
            keyExtractor={(item) => item.bilhete_id}
            ItemSeparatorComponent={() => <VStack height={20} />}
            data={ingressosComprados}
            ListFooterComponent={<View style={{ marginBottom }} />}
         />
      </Animated.View>
   )
}
