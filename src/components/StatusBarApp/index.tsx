import React from 'react'
import { Platform, SafeAreaView, StatusBar } from 'react-native'
import { GradienteApp } from '../GradienteApp'

export function StatusBarApp() {


   return (
      <GradienteApp
         style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
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
      </GradienteApp>
   )
}
