import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import Text from "../../components/Text";
import { Card } from "../../components/Card";
import VStack from "../../components/Views/Vstack";
import { data } from "../../../store/eventos";
import { FlatList } from "react-native";
import HStack from "../../components/Views/Hstack";
import { IconPin } from "../../icons";

type ItemData = {
   item: typeof data.data[0];
}

export function Eventos() {
   const navigate = useNavigation();

   const renderItem = useCallback(({ item }: ItemData) => {
      return (
         <Card.Root pr="xs" onPress={() => navigate.navigate("EventosDetalhe", { id: item.id })}>
            <Card.Image
               flex={1}
               height={88}
               source={{ url: item.path_imagem }} />

            <VStack
               flex={2}
               justifyContent="space-evenly"
               pb="sm">
               <Card.Title mt="sm">{item.nome}</Card.Title>
               <HStack>

                  <Card.SubTitle
                     leftIcon={<IconPin />}
                  >
                     {item.nome_local} {'\n'}
                     <Card.Span>
                        {item.cidade} | {item.estado} - {item?.hora_evento + 'h' || 'hora não definida'}
                     </Card.Span>
                  </Card.SubTitle>

                  <Card.Widget>
                     <Text textAlign="center" color="white" fontWeight="900" fontSize={27}>
                        {item.dia_evento}
                     </Text>
                     <Text color="white" textTransform="uppercase" fontWeight="900" fontSize={22} style={{ marginTop: -12 }}>
                        {item.mes_evento}
                     </Text>
                  </Card.Widget>
               </HStack>
            </VStack>

         </Card.Root>
      )
   }, []);

   return (
      <VStack m="sm" gap="md">
         <FlatList
            ItemSeparatorComponent={() => <VStack height={20} />}
            data={data.data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
         />
      </VStack>
   )
}