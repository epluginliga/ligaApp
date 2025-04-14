import React, { useEffect, useRef } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

type SlideProps<T> = FlatListProps<T> & {
   data: T[];
};
export function Slide<T>({ data, ...rest }: SlideProps<T>) {
   const flatListRef = useRef<FlatList<T>>(null);

   useEffect(() => {
      if (data?.length) {
         let index = 0;
         const interval = setInterval(() => {
            if (flatListRef.current) {
               index = (index + 1) % data?.length;
               flatListRef.current.scrollToIndex({ animated: true, index });
            }
         }, 3000); // muda a cada 3 segundos

         return () => clearInterval(interval);
      }
   }, [data]);

   if (!data) return;

   return (
      <FlatList
         contentContainerStyle={{ paddingVertical: 10 }}
         ref={flatListRef}
         data={data}
         horizontal
         pagingEnabled
         ItemSeparatorComponent={() => <View style={styles.spacer} />}
         showsHorizontalScrollIndicator={false}
         {...rest}
      />
   );
}

const styles = StyleSheet.create({
   spacer: {
      height: 10,
   },
});
