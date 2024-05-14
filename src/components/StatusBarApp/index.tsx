import React, { useState } from 'react'
import { Platform, SafeAreaView, StatusBar } from 'react-native'
import { GradienteApp } from '../GradienteApp'

export function StatusBarApp() {
   const [height, setHeight] = useState(0)

   return (
      <GradienteApp
         style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : height }}
      >
         <SafeAreaView onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeight(height);
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
