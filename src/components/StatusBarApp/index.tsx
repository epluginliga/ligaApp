import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Dimensions, Platform, SafeAreaView, StatusBar, useWindowDimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Theme } from '../../theme/default'

export function StatusBarApp() {
   const { colors } = useTheme<Theme>();

   return (
      <LinearGradient
         colors={[
            colors.primary,
            colors.purple,
            colors.azul,
         ]}
         style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
         start={{ x: 1, y: -0.4 }}
         end={{ x: -1.9, y: 0.5 }}>
         <SafeAreaView onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            console.log('Altura da StatusBar:', height);
         }}>
            <StatusBar
               barStyle="light-content"
               translucent={true}
               backgroundColor={'transparent'}
            />
         </SafeAreaView>

      </LinearGradient>

   )
}
