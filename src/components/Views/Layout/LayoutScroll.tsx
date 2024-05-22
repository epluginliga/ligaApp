import React from 'react'
import { ScrollView } from 'react-native'

type LayoutScroll = {
   children: React.ReactNode | React.ReactNode[],
   topFixed?: React.ReactNode
}

export function LayoutScroll({ children, topFixed }: LayoutScroll) {

   return (
      <>
         {topFixed && topFixed}
         <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               minHeight: "80%"
            }}
         >
            {children}
         </ScrollView>
      </>
   )

}
