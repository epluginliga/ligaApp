import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


type Layout = {
   children: React.ReactNode | React.ReactNode[]
}

export function LayoutRoot({ children }: Layout) {
   return (
      <SafeAreaView style={{flexGrow:1}}>
         {children}
      </SafeAreaView>
   )
}
