import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

import Text from "../../components/Text";
import { Card } from "../../components/Card";
import VStack from "../../components/Views/Vstack";
import { data } from "../../../store/eventos";
import { Dimensions, FlatList, ImageBackground, StyleSheet } from "react-native";
import HStack from "../../components/Views/Hstack";
import { IconPin } from "../../icons";

type ItemData = {
   item: typeof data.data[0];
}

export function Eventos() {
   const navigate = useNavigation();
   const { height, width } = Dimensions.get("screen");

   function SlideImage({ item }: any) {
      const styles = StyleSheet.create({
         image: {
            width: 150,
            height: "100%",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            overflow: "hidden"
         }
      });

      return (
         <ImageBackground resizeMode="cover"
            source={{ uri: item.path_imagem }}
            style={{ height: height / 3, width }}
         />
      )
   }

   const renderItem = useCallback(({ item }: ItemData) => {
      return (
         <Card.Root pr="xs" onPress={() => navigate.navigate("EventosDetalhe", { id: item.id })}>
            <Card.Image
               flex={1}
               height={88}
               source={{ url: item.path_imagem }} />
            <VStack flex={2} justifyContent="space-evenly" pb="sm">
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
            <FlatList
               nestedScrollEnabled
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               horizontal={true}
               snapToAlignment="start"
               scrollEventThrottle={16}
               decelerationRate="fast"
               data={data.data}
               keyExtractor={(item) => item.id}
               renderItem={SlideImage}
            />
         )}
         ItemSeparatorComponent={() => <VStack height={20} />}
         data={data.data}
         keyExtractor={(item) => item.id}
         renderItem={renderItem}
      />
   )
}