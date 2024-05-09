import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import Text from "../../components/Text";
import { Card } from "../../components/Card";
import VStack from "../../components/Views/Vstack";
import { data } from "../../../store/eventos";
import HStack from "../../components/Views/Hstack";
import { IconPin } from "../../icons";
import { Carrocel } from "../../components/Carrocel";
import { Button } from "../../components/Button";

type ItemData = {
   item: typeof data.data[0];
}

export function Eventos() {
   const navigate = useNavigation();

   const renderItem = useCallback(({ item }: ItemData) => {
      return (
         <Card.Root marginHorizontal="sm" pr="xs" onPress={() => navigate.navigate("EventosDetalhe", { id: item.id })}>
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item.path_imagem }} />

            <VStack
               flex={2}
               justifyContent="space-evenly"
               pb="sm">
               <Card.Title marginVertical="md">{item.nome}</Card.Title>
               <HStack marginRight="sm">
                  <Card.SubTitle
                     leftIcon={<IconPin />}
                  >
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
      <FlatList
         ListHeaderComponent={(
            <VStack gap="md" justifyContent="space-evenly" mb="md">

               <Carrocel>
                  <VStack justifyContent="space-between" >
                     <VStack>
                        <Text color="white">qui - <Text fontWeight="900">30</Text> de maio</Text>
                        <Text fontSize={26} fontWeight="900" color="white">Ressaca dos esquecidos</Text>
                        <Text fontSize={16} color="white">
                           <Text fontWeight="900" color="white">Goiânia - GO</Text> | Espaços dois ipês
                        </Text>
                     </VStack>

                     <Button
                        variant="link"
                        onPress={(item: any) => navigate.navigate("EventosDetalhe", {
                           id: item.id,
                        })}
                     >
                        @Ver detalhes do evento
                     </Button>

                  </VStack>
               </Carrocel>

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
   )
}

