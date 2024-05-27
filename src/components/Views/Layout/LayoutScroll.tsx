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
         style={{
            flex: 1,
         }}
         {...rest}
      >
         {children}
      </ScrollView>
   )

}
