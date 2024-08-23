import React from 'react'
import { Ellipse, Mask, Rect, Svg, Text } from 'react-native-svg'

export function Ovo() {
   return (
      <Svg width="100%" height="100%" viewBox="0 30 310 240" preserveAspectRatio="xMidYMid meet">
         <Rect width="100%" height="100%" fill="none" />
         <Mask id="ellipse-mask">
            <Rect width="100%" height="100%" fill="white" />
            <Ellipse cx="150" cy="174" rx="110" ry="150" fill="black" />
         </Mask>
         <Rect width="100%" height="100%" fill="white" mask="url(#ellipse-mask)" />
         <Ellipse cx="150" cy="174" rx="110" ry="150" fill="none" stroke="black" stroke-width="1" />
         <Text dx="65" dy="370" fontFamily='Poppins' fontSize={14}>
            Posicione o rosto no círculo
         </Text>
      </Svg>
   )
}

