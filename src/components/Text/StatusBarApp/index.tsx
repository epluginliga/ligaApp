import { useTheme } from '@shopify/restyle'
import React from 'react'
import { SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Theme } from '../../../theme/default'

export function StatusBarApp() {
   const { colors } = useTheme<Theme>();

   return (
      <LinearGradient
         colors={[
            colors.primary,
            colors.purple,
            colors.azul,
         ]}
         start={{ x: 1, y: -0.4 }}
         end={{ x: -1.9, y: 0.5 }}>
         <SafeAreaView />
      </LinearGradient>
   )
}
