import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import Text from "../../components/Text";
import { Card } from "../../components/Card";
import VStack from "../../components/Views/Vstack";
import HStack from "../../components/Views/Hstack";
import { Icon } from "../../icons";
import { fetchEventos } from "../../services/eventos";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";
import { Layout } from "../../components/Views/Layout";
import { dataApp } from "../../utils/utils";
import { Imagem } from "../../components/Imagem";
import { Button } from "../../components/Button";
import { useMMKVString } from "react-native-mmkv";
import { useAuth, usuarioStorage } from "../../hooks/auth";
import { EventosPayload } from "../../services/@eventos";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/default";

export type ItemData = {
   item: EventosPayload;
}

type DestaqueProps = {
   evento?: EventosPayload;
}
function Destaque({ evento }: DestaqueProps) {
   const navigate = useNavigation();

   if (!evento) return null;

   const dataEvento = dataApp(evento.data_evento);

   return (
      <VStack position='relative' alignItems="center" overflow='hidden' borderRadius={10}>
         <Imagem style={{ position: "relative" }} source={{ uri: evento.path_imagem }} >
            <VStack zIndex={999} justifyContent="space-between" flex={1}>
               <VStack gap="xs">
                  <Text color="white">{dataEvento.diaSemana()} - <Text color='white' fontWeight="900">
                     {dataEvento.diaMes()}</Text> de {dataEvento.nomeMes()}
                  </Text>
                  <Text fontSize={26} fontWeight="900" color="white">
                     {evento.nome}
                  </Text>
                  <Text fontSize={16} color="white">
                     <Text fontWeight="900" color="white">
                        {evento.cidade} - {evento.estado}
                     </Text>
                     | {evento.nome_local}
                  </Text>
               </VStack>

               <Button
                  variant="link"
                  onPress={() => navigate.navigate("EventosDetalhe", {
                     id: evento.id,
                  })}
               >
                  @Ver detalhes do evento
               </Button>
            </VStack>
         </Imagem>
      </VStack>
   )
}

export function Eventos() {
   const navigate = useNavigation();
   const [route] = useMMKVString('route')
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
            onPress={() => navigate.navigate("EventosDetalhe", { id: item.id })}>

            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item.path_imagem }} />

            <VStack
               flex={2}
               justifyContent="space-evenly"
               pb="sm">

               <Card.Title marginVertical="sm">{item.nome}</Card.Title>

               <HStack justifyContent="space-around" alignItems="center">

                  <VStack flex={1}>
                     <Card.SubTitle>
                        {item.nome_local} {'\n'}
                        <Card.Span>
                           <Icon.Pin size={16} />
                           {item.cidade} | {item.estado} - {diaEvento.hora() || 'hora não definida'}
                        </Card.Span>
                     </Card.SubTitle>
                  </VStack>

                  <VStack>
                     <Card.Widget>
                        <Text textAlign="center" color="white" fontWeight="700" fontSize={22}>
                           {diaEvento.diaMes()}
                        </Text>
                        <Text color="white" textTransform="uppercase" fontWeight="500" fontSize={14} style={{ marginTop: -8 }}>
                           {diaEvento.nomeMes()}
                        </Text>
                     </Card.Widget>
                  </VStack>


               </HStack>
            </VStack>
         </Card.Root>
      )
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

   const destaque = data?.data?.find(evento => !!evento.destaque);

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
         ListHeaderComponent={(
            <VStack gap="md" justifyContent="space-evenly" mb="md">

               <Destaque evento={destaque} />

               <VStack
                  borderTopColor="bege"
                  marginVertical="md"
                  pt="md"
                  marginHorizontal="sm"
                  borderTopWidth={1}>
                  <Text>Se <Text variant="header">LIGA</Text> no que está acontecendo</Text>
               </VStack>
            </VStack>
         )}
         ListEmptyComponent={<ListEmptyComponent title="Nenhum evento disponível" />}
         ItemSeparatorComponent={() => <VStack height={20} />}
         data={data?.data}
         keyExtractor={(item) => item.id}
         renderItem={renderItem}
         ListFooterComponent={<VStack height={20} />}
         showsVerticalScrollIndicator={false}
      />
   );
}