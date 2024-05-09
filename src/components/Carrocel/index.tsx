import React, { useCallback } from 'react'
import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from 'react-native';

import { data } from '../../../store/eventos';

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

      return (
         <ImageBackground resizeMode="cover"
            source={{ uri: item.path_imagem }}
            style={{
               height: windowHeight / 3,
               width: windowWidth - 17,
               ...styles.image
            }}
         >
            {children && children}
         </ImageBackground>
      )
   }

   return (
      <FlatList
         style={{ paddingVertical: 4, paddingHorizontal: 8 }}
         ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
         nestedScrollEnabled
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         horizontal={true}
         snapToAlignment="start"
         decelerationRate="normal"
         data={data.data}
         renderItem={SlideImage}
         {...flatListOptimizationProps}
      />
   )
}

const styles = StyleSheet.create({
   image: {
      borderRadius: 10,
      overflow: "hidden",
      padding: 10,
   }
});