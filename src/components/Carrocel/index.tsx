import React, { useCallback } from 'react'
import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from 'react-native';

import { data } from '../../../store/eventos';
import VStack from '../Views/Vstack';
import Text from '../Text';
import { Button } from '../Button';
import { useNavigation } from '@react-navigation/native';
import { ItemData } from '../../screens/Eventos';
import { Imagem } from '../Imagem';

export type Carrocel = {}
export function Carrocel({ }: Carrocel) {
   const { width: windowWidth } = Dimensions.get("window");
   const navigate = useNavigation();

   const flatListOptimizationProps = {
      initialNumToRender: 0,
      maxToRenderPerBatch: 1,
      removeClippedSubviews: true,
      scrollEventThrottle: 16,
      windowSize: 2,
      keyExtractor: useCallback((e: any) => e.id, []),
      getItemLayout: useCallback(
         (_: any, index: number) => ({
            index,
            length: windowWidth,
            offset: index * windowWidth,
         }),
         []
      ),
   };
   function SlideImage({ item }: ItemData) {

      return (
         <VStack position='relative' overflow='hidden' borderRadius={10}>
            <Imagem source={{ uri: item.path_imagem }} >
               <VStack zIndex={999} justifyContent="space-between" >
                  <VStack>
                     <Text color="white">qui - <Text fontWeight="900">{item.dia_evento}</Text> {item.mes_evento}</Text>
                     <Text fontSize={26} fontWeight="900" color="white">{item.nome}</Text>
                     <Text fontSize={16} color="white">
                        <Text fontWeight="900" color="white">{item.cidade} - {item.estado}</Text> | {item.nome_local}
                     </Text>
                  </VStack>

                  <Button
                     variant="link"
                     onPress={() => navigate.navigate("EventosDetalhe", {
                        id: item.id,
                     })}
                  >
                     @Ver detalhes do evento
                  </Button>
               </VStack>
            </Imagem>

         </VStack>
      )
   }

   return (
      <FlatList
         style={{ paddingVertical: 4, paddingLeft: 5 }}
         ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
         nestedScrollEnabled
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         horizontal={true}
         snapToAlignment="start"
         decelerationRate="fast"
         data={[data.data[0]]}
         renderItem={SlideImage}
         {...flatListOptimizationProps}
      />
   );
}
