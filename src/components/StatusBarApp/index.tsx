import { useTheme } from '@shopify/restyle'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Theme } from '../../theme/default'

export function StatusBarApp() {
   const { colors } = useTheme<Theme>();

   console.log()
   return (
      <LinearGradient
         colors={[
            colors.primary,
            colors.purple,
            colors.azul,
         ]}
         style={{ height: 60 }}
         start={{ x: 1, y: -0.4 }}
         end={{ x: -1.9, y: 0.5 }}>

      </LinearGradient>

   )
}
