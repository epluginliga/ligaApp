import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


type Layout = {
   children: React.ReactNode | React.ReactNode[]
}

export function LayoutRoot({ children }: Layout) {
   const insets = useSafeAreaInsets();
   return (
      <View style={{ flexGrow: 1, marginBottom: insets.bottom + 6 }}>
         {children}
      </View>
   )
}
