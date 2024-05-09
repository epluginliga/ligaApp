import React from 'react'
import { TextProps, useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'

export type CardWidget = TextProps<Theme> & {
   children: React.ReactNode
}


export function CardWidget({ children, ...rest }: CardWidget) {
   const { colors } = useTheme<Theme>();

   return (
      <LinearGradient
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 0 }}
         colors={[colors.purple, colors.purple_200]}
         style={styles.cardWidget}
      >
         {children}
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   cardWidget: {
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 12,
   },

});