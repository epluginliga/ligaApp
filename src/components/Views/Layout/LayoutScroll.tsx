import React from 'react'
import { ScrollView } from 'react-native'

type LayoutScroll = {
   children: React.ReactNode | React.ReactNode[]
}

export function LayoutScroll({ children }: LayoutScroll) {
   return (
      <ScrollView
         style={{ flex: 1 }}
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
      >
         {children}
      </ScrollView>
   )

}
