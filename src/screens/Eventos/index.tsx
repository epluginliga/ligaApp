import React, { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import Text from '../../components/Text';
import { Card } from '../../components/Card';
import VStack from '../../components/Views/Vstack';
import HStack from '../../components/Views/Hstack';
import { Icon } from '../../icons';
import { fetchEventos } from '../../services/eventos';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';
import { dataApp } from '../../utils/utils';
import { Imagem } from '../../components/Imagem';
import { useMMKVString } from 'react-native-mmkv';
import { useAuth, usuarioStorage } from '../../hooks/auth';
import { EventosPayload } from '../../services/@eventos';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { Slide } from '../../components/Slide';
import { Navigate } from '../../components/Navigate';

export type ItemData = {
   item: EventosPayload;
};

function Item({ item }: { item: EventosPayload }) {
   return (
      <Navigate
         url="EventosDetalhe"
         params={{
            id: item.id,
         }}
      >
         <VStack overflow="hidden" px="xs">
            <Imagem source={{ uri: item.path_imagem }} />
         </VStack>
      </Navigate>
   );
}

type DestaqueProps = {
   evento?: EventosPayload[];
};
function Destaque({ evento }: DestaqueProps) {
   if (!evento) return null;

   return <Slide data={evento} renderItem={Item} />;
}

export function Eventos() {
   const navigate = useNavigation();
   const [route] = useMMKVString('route');
   const { logado } = useAuth();
   const insets = useSafeAreaInsets();
   const { colors } = useTheme<Theme>();

   const { data, isLoading, refetch } = useQuery({
      queryKey: ['eventos'],
      queryFn: fetchEventos,
   });

   const renderItem = useCallback(({ item }: ItemData) => {
      const diaEvento = dataApp(item.data_evento);

      return (
         <Card.Root
            marginHorizontal="sm"
            pr="xs"
            onPress={() => navigate.navigate('EventosDetalhe', { id: item.id })}
         >
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item.path_imagem }}
            />

            <VStack flex={2} justifyContent="space-evenly" pb="sm">
               <Card.Title marginVertical="sm">{item.nome}</Card.Title>

               <HStack justifyContent="space-around" alignItems="center">
                  <VStack flex={1}>
                     <Card.SubTitle>
                        {item.nome_local && item.nome_local} {'\n'}
                        <Card.Span>
                           {item.cidade && <Icon.Pin size={16} />}
                           {item.cidade && `${item.cidade} | `}
                           {item.estado && `${item.estado}`}
                        </Card.Span>
                     </Card.SubTitle>
                     <Card.SubTitle>
                        <Card.Span>
                           <Icon.Clock size={12} />{' '}
                           {diaEvento.hora() || ''}, {item.dia_semana}
                        </Card.Span>
                     </Card.SubTitle>
                  </VStack>

                  <VStack flex={1} justifyContent="center">
                     <Card.Widget>
                        <VStack justifyContent='center' alignItems='center' gap='xs' p='sm'>
                           <Text
                           textAlign="center"
                           color="white"
                           fontWeight="700"
                           fontSize={22}
                        >
                           {diaEvento.diaMes()}
                        </Text>
                        <Text
                           color="white"
                           textTransform="uppercase"
                           fontWeight="500"
                           fontSize={14}
                           textAlign="center"
                        >
                           {diaEvento.nomeMes()}
                        </Text>
                        </VStack>
                     </Card.Widget>
                  </VStack>
               </HStack>
            </VStack>
         </Card.Root>
      );
   }, []);

   useEffect(() => {
      const time = setTimeout(() => {
         if (route && logado) {
            navigate.navigate(route as any);
            usuarioStorage.delete('route');
         }
      }, 500);

      return () => clearTimeout(time);
   }, [route, logado]);

   if (isLoading) {
      return null;
   }

   const destaque = data?.data?.filter(evento => !!evento.destaque);

   return (
      <FlatList
         refreshControl={
            <RefreshControl
               tintColor={colors.primary}
               refreshing={false}
               onRefresh={refetch}
            />
         }
         bouncesZoom={false}
         contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
         }}
         ListHeaderComponent={
            <VStack gap="md" justifyContent="space-evenly" mb="md">
               <Destaque evento={destaque} />

               <VStack
                  borderTopColor="bege"
                  marginVertical="md"
                  pt="md"
                  marginHorizontal="sm"
                  borderTopWidth={1}
               >
                  <Text>
                     Se <Text variant="header">LIGA</Text> no que está
                     acontecendo
                  </Text>
               </VStack>
            </VStack>
         }
         ListEmptyComponent={
            <ListEmptyComponent title="Nenhum evento disponível" />
         }
         ItemSeparatorComponent={() => <VStack height={20} />}
         data={data?.data}
         keyExtractor={item => item.id}
         renderItem={renderItem}
         ListFooterComponent={<VStack height={20} />}
         showsVerticalScrollIndicator={false}
      />
   );
}
