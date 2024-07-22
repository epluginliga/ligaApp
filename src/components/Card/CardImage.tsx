import { BoxProps, createBox } from '@shopify/restyle';
import React from 'react'
import { Image, ImageBackground, ImageBackgroundProps, ImageProps, StyleSheet } from 'react-native'
import { Theme } from '../../theme/default';

export type CardImage = BoxProps<Theme> & ImageBackgroundProps & {
   source: any;
   children?: React.ReactNode;
}


export function CardImage({ children, ...rest }: CardImage) {
   return (
      <ImageBackground resizeMode="cover"
         style={styles.image}
         {...rest}
         source={rest.source}
      >
         {children && children}
      </ImageBackground>
   )

}

const styles = StyleSheet.create({
   image: {
      flex:1,
      height: "100%",
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      overflow: "hidden"
   }
});