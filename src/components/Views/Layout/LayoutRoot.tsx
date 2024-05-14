import React from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import HStack from '../Hstack'
import { IconArrowLeft } from '../../../icons/Arrow'
import VStack from '../Vstack'

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
