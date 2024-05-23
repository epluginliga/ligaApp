import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

type LayoutScroll = ScrollViewProps & {
   children: React.ReactNode | React.ReactNode[],
   topFixed?: React.ReactNode
}

export function LayoutScroll({ children, ...rest }: LayoutScroll) {

   return (
      <ScrollView
         contentInsetAdjustmentBehavior='automatic'
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{ justifyContent: "space-between" }}
         style={{
            flex: 1,
            flexBasis: '0%',
            flexGrow: 1,
            flexShrink: 1,
            height: "100%"
         }}
         {...rest}
      >
         {children}
      </ScrollView>
   )

}
