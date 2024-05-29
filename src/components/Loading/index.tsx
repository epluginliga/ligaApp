import React from 'react'
import VStack from '../Views/Vstack'
import Text from '../Text'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import HStack from '../Views/Hstack'
import { ActivityIndicator } from 'react-native'

export function Loading() {
   return (
      <Animated.View
         entering={FadeIn}
         exiting={FadeOut}
         style={[{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 999,
            width: "100%",
            height: "100%"
         }]}
      >
         <HStack
            justifyContent='center'
            alignItems='center'
            position='absolute'
            backgroundColor='black_opacity'
            width="100%"
            height="100%" >
               <ActivityIndicator size="large" color="#fff" />
            <Text variant='header' color='white'>Aguarde..</Text>
         </HStack>
      </Animated.View>
   )

}
