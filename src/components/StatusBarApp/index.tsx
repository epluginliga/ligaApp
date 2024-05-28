import React from 'react'
import { StatusBar } from 'react-native'

export function StatusBarApp() {
   return (
      <StatusBar
         barStyle="light-content"
         translucent={true}
         backgroundColor={'transparent'}
      />
   )
}
