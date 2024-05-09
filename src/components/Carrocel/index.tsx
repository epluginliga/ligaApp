import React, { useCallback } from 'react'
import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from 'react-native';

import { data } from '../../../store/eventos';
import VStack from '../Views/Vstack';

export type Carrocel = {
   children?: React.ReactNode | React.ReactNode[];
}
export function Carrocel({ children }: Carrocel) {
   const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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

   function SlideImage({ item }: any) {
      const width = windowWidth - 12;
      return (
         <VStack position='relative' overflow='hidden' borderRadius={10}>
            <ImageBackground
               blurRadius={4}
               resizeMode="cover"
               source={{ uri: item.path_imagem }}
               style={{
                  height: windowHeight / 2.5,
                  width,
                  ...styles.image
               }}
            >
               <VStack zIndex={999}>
                  {children && children}
               </VStack>

               <View style={{
                  width,
                  height: windowHeight,
                  ...styles.shadowBanner
               }} />

            </ImageBackground>

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

const styles = StyleSheet.create({
   image: {
      borderRadius: 10,
      overflow: "hidden",
      padding: 10,
      position: "relative",
   },
   shadowBanner: {
      backgroundColor: "#000",
      position: "absolute",
      top: 0,
      opacity: 0.4,
   }
});