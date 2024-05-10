import React from 'react'
import { SafeAreaView } from 'react-native'

type Layout = {
   children: React.ReactNode | React.ReactNode[]
}

export function LayoutRoot({ children }: Layout) {
   return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 6 }}>
         {children}
      </SafeAreaView>
   )

}
