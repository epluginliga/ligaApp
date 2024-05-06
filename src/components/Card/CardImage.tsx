import { BoxProps, createBox } from '@shopify/restyle';
import React from 'react'
import { Image, ImageBackground, ImageProps, StyleSheet } from 'react-native'
import { Theme } from '../../theme/default';

export type CardImage = BoxProps<Theme> & {
   source: any;
}


export function CardImage({ ...rest }: CardImage) {
   return (
      <ImageBackground resizeMode="cover"
         style={styles.image}
         source={rest.source} />
   )

}


const styles = StyleSheet.create({
   image: {
      width: 150,
      height: "100%",
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      overflow: "hidden"
   }
});