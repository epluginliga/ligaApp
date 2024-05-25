import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

export interface DelayProps {
   opacity: number, offset: number
}

export interface AnimateViewActionProps {
   reset: (data?: DelayProps) => void
   init: () => void
}

export interface AnimateViewProps {
   delay?: DelayProps
   children: React.ReactNode | string
}

export const AnimateView = forwardRef(({
   children,
   delay = { opacity: 150, offset: 200 },
   ...rest
}: AnimateViewProps, ref) => {
   const viewRef = useRef(null)
   const opacityPage = useSharedValue(0)
   const offsetPage = useSharedValue(50)

   const animatedStyles = useAnimatedStyle(() => {
      const opacity = withSpring(opacityPage.value, { duration: 1500 });

      return {
         opacity,

         transform: [
            {
               translateY: withDelay(
                  delay.offset, withSpring(offsetPage.value)
               )
            }
         ]
      }
   })

   useImperativeHandle(ref, () => {
      return {
         reset: () => {
            opacityPage.value = 0
            offsetPage.value = 150
         },
         init: () => {
            opacityPage.value = 1
            offsetPage.value = 0
         }
      }
   }, [])

   useEffect(() => {
      opacityPage.value = 1
      offsetPage.value = 0
   }, [offsetPage])

   return (
      <Animated.View ref={viewRef} style={[animatedStyles]}>
         {children}
      </Animated.View >
   )
})
