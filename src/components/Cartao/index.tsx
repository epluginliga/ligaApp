import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { State, TapGestureHandler } from 'react-native-gesture-handler'

import LinearGradient from 'react-native-linear-gradient'
import { cartaoCredito } from '../../utils/utils'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import VStack from '../Views/Vstack'
import HStack from '../Views/Hstack'
import { Icon } from '../../icons'
import Text from '../Text'
import Circle from '../Views/Circle'

export interface ITemCardActions {
   front?: () => void
   back?: () => void
}

interface ItemCardProps {
   item?: {
      id?: number
      number?: string
      holder_name?: string
      cvv?: number | string
      validade?: string
      brand?: string
      default?: boolean,
   },
   children?: React.ReactNode,

}
export const CartaoWidget = forwardRef(({ item, children }: ItemCardProps, ref: any) => {
   const rotateY = useSharedValue(0)
   const { colors } = useTheme<Theme>()
   const creditCard = useRef(null);
   const controlaCartao = cartaoCredito(item?.number || '');

   const front = useCallback(() => {
      rotateY.value = withTiming(0,
         {
            duration: 500,
            easing: Easing.ease
         }
      )
   }, [])

   const back = useCallback(() => {
      rotateY.value = withTiming(180,
         {
            duration: 500,
            easing: Easing.ease
         }
      )
   }, [])

   useImperativeHandle(ref, () => ({
      front,
      back
   }))

   const toogleFlip = () => {
      if (rotateY.value) {
         front(); return
      }
      back()
   }

   const frontStyle = useAnimatedStyle(() => {
      return {
         transform: [
            { rotateY: `${rotateY.value}deg` },
            { perspective: 1000 }
         ],
         position: 'relative',
         zIndex: 9999
      }
   })

   const backStyle = useAnimatedStyle(() => {
      return {
         transform: [
            { rotateY: `${rotateY.value + 180}deg` },
            { perspective: 1000 }
         ]
      }
   })

   const brand = item?.brand?.toLocaleLowerCase() || controlaCartao.detectaBandeiraCartao() || 'visa';

   function Front() {
      return (
         <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
               if (nativeEvent.state === State.END) {
                  toogleFlip()
               }
            }}
         >
            <Animated.View
               ref={creditCard}
               style={[frontStyle, { backfaceVisibility: 'hidden' }]}>
               <LinearGradient
                  colors={controlaCartao.bandeiras[brand]?.colors || [colors.bege_200, colors.bege_900]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 1.4 }}
                  style={{
                     borderRadius: 18,
                     height: 240,
                     overflow: 'hidden'
                  }}
               >
                  <VStack
                     gap="xl"
                     justifyContent="space-between"
                     marginHorizontal='md'
                  >
                     <VStack alignItems='flex-end'>
                        <HStack
                           marginTop='md'
                           height={20}
                           width={100}
                           borderRadius={20}
                           backgroundColor='white'
                           opacity={0.1}
                        />
                     </VStack>

                     <VStack
                        marginTop='sm'
                        opacity={0.4}
                        height={49.84}
                        width={55.16}
                        backgroundColor="white"
                        borderRadius={8}
                     />

                     <VStack alignItems="flex-end" mt="none">
                        <Text color="white">
                           {item?.holder_name?.toUpperCase()}
                        </Text>
                     </VStack>

                  </VStack>
               </LinearGradient>
            </Animated.View>
         </TapGestureHandler>
      )
   }

   function Back() {
      return (
         <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
               if (nativeEvent.state === State.END) {
                  toogleFlip()
               }
            }}
         >
            <Animated.View
               ref={creditCard}
               style={[backStyle, {
                  position: 'absolute',
                  width: '100%'
               }]}>
               <LinearGradient
                  colors={controlaCartao.bandeiras[brand]?.colors || [colors.bege_200, colors.bege_900]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 1.4 }}
                  style={{
                     borderRadius: 18,
                     height: 240,
                     overflow: 'hidden'
                  }}
               >
                  <VStack
                     height="100%"
                     justifyContent="space-between"
                     padding="md"
                  >
                     <VStack alignItems='flex-end'>
                        <HStack
                           marginTop='xs'
                           height={40}
                           width={60}
                           borderRadius={20}
                           backgroundColor='white'
                           opacity={0.1}
                        />
                     </VStack>

                     <VStack gap="md">
                        <HStack gap="xs">
                           {item?.number
                              ? (
                                 <Text
                                    color="bege"
                                    fontWeight="bold"
                                 >
                                    {item.number}
                                 </Text>
                              )
                              : [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                                 <Circle key={item.toString()} />
                              ))}
                        </HStack>

                        <HStack gap="md" paddingBottom='xs'>
                           <Text
                              color='bege_200'
                              fontWeight="bold">
                              {item?.validade || 'MM/AA'}
                           </Text>
                           <Text
                              color="bege_200"
                              fontWeight="bold">
                              {item?.cvv || 'xxx'}
                           </Text>
                        </HStack>

                     </VStack>
                  </VStack>
               </LinearGradient>
            </Animated.View>
         </TapGestureHandler>
      )
   }

   return (
      <VStack flex={1} >

         {children && children}

         <VStack gap="sm" marginTop='sm'>
            <Front />
            <Back />
         </VStack>
      </VStack>
   )
})
