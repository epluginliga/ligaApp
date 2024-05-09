import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, FlatList } from "react-native";

import Text from "../../components/Text";
import { Card } from "../../components/Card";
import VStack from "../../components/Views/Vstack";
import { data } from "../../../store/eventos";
import HStack from "../../components/Views/Hstack";
import { IconPin } from "../../icons";
import { Carrocel } from "../../components/Carrocel";
import { create } from "react-test-renderer";

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
      <FlatList
         ListHeaderComponent={(
            <VStack gap="lg" justifyContent="space-evenly" mb="md">
               <Carrocel>
                  <Button title="Enviar" onPress={(item: any) => navigate.navigate("EventosDetalhe", {
                     id: item.id,
                  })}>
                  </Button>
               </Carrocel>
               <Text > Se <Text variant="header">LIGA</Text> no que está acontecendo</Text>
            </VStack>
         )}
         ItemSeparatorComponent={() => <VStack height={20} />}
         data={data.data}
         keyExtractor={(item) => item.id}
         renderItem={renderItem}
      />
   )
}

