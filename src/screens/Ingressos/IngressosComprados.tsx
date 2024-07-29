import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';

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

function Item({ item }: { item: IngressosPayload }) {
   const dataISO = dataApp().converteDataBRtoISO(item.evento_data_evento)
   const dataEvento = dataApp(dataISO);

   return (
      <Card.Root
         marginHorizontal="sm"
         pr="xs"
         opacity={0.4}
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

         </VStack>
      </Card.Root>
   )
}

export function IngressosComprados() {
   const { data } = useQuery({
      queryKey: ['ingressosComprados'],
      queryFn: fetchIngressoComprado,
      refetchOnMount: false

   });

   const insets = useSafeAreaInsets();

   if (!data) return null;

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
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               <ListEmptyComponent title='Nenhum Ingresso utilizado' />
            }
            renderItem={Item}
            keyExtractor={(item) => item.bilhete_id}
            ItemSeparatorComponent={() => <VStack height={20} />}
            data={data.data}
            ListFooterComponent={<View style={{ height: insets.bottom + 60 }} />}
         />
      </Animated.View>
   )
}
