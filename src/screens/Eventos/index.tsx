import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "../../components/Text";
import { Card } from "../../components/Card";
import VStack from "../../components/Views/Vstack";
import { data } from "../../../store/eventos";
import HStack from "../../components/Views/Hstack";
import { Carrocel } from "../../components/Carrocel";
import { Icon } from "../../icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_REDIRECT } from "../../hooks/auth";
import { Loading } from "../../components/Loading";

export type ItemData = {
   item: typeof data.data[0];
}

export function Eventos() {
   const navigate = useNavigation();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function obtemUrlRedirect() {
         try {
            const route = await AsyncStorage.getItem(KEY_REDIRECT);
            if (route) {
               navigate.navigate(JSON.parse(route) as any);
            }
         } catch (e) { }
         finally {
            setLoading(false);
         }
      }

      obtemUrlRedirect();
   }, [])

   const renderItem = useCallback(({ item }: ItemData) => {
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

               <HStack justifyContent="space-around">

                  <Card.SubTitle leftIcon={<Icon.Pin size={16} />} >
                     {item.nome_local} {'\n'}
                     <Card.Span>
                        {item.cidade} | {item.estado} - {item?.hora_evento + 'h' || 'hora não definida'}
                     </Card.Span>
                  </Card.SubTitle>

                  <Card.Widget>
                     <Text textAlign="center" color="white" fontWeight="700" fontSize={22}>
                        {item.dia_evento}
                     </Text>
                     <Text color="white" textTransform="uppercase" fontWeight="500" fontSize={14} style={{ marginTop: -8 }}>
                        {item.mes_evento}
                     </Text>
                  </Card.Widget>
               </HStack>
            </VStack>
         </Card.Root>
      )
   }, []);

   return (
      <>
      {loading && <Loading />}
      <SafeAreaView>
         <FlatList

            ListHeaderComponent={(
               <VStack gap="md" justifyContent="space-evenly" mb="md">

                  <Carrocel />

                  <VStack borderTopColor="bege" marginVertical="md" pt="md" marginHorizontal="sm" borderTopWidth={1}>
                     <Text>Se <Text variant="header">LIGA</Text> no que está acontecendo</Text>
                  </VStack>
               </VStack>
            )}
            ItemSeparatorComponent={() => <VStack height={20} />}
            data={data.data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListFooterComponent={<VStack height={20} />}
            showsVerticalScrollIndicator={false}
         />
      </SafeAreaView>
      </>
   );
}