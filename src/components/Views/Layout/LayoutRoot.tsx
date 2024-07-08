import React from 'react'
import { SafeAreaView } from 'react-native'

type Layout = {
   children: React.ReactNode | React.ReactNode[]
}

export function LayoutRoot({ children }: Layout) {

   return (
      <SafeAreaView style={{
         flex: 1,
         flexBasis: '0%',
         flexGrow: 1,
         flexShrink: 1,

      }}>
         {children}
      </SafeAreaView>
   )

}
