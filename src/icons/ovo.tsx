import React from 'react'
import { Ellipse, Mask, Path, Rect, Svg } from 'react-native-svg'

export function Ovo({ width, height }: any) {
   return (
      <Svg width="100%" height="80%" viewBox="0 0 100 120"  preserveAspectRatio="xMidYMid meet">
         <Rect width="100%" height="100%" fill="none" />
         <Mask id="ellipse-mask">
            <Rect width="100%" height="100%" fill="white" />
            <Ellipse cx="50" cy="50" rx="30" ry="40" fill="black" />
         </Mask>
         <Rect width="100%" height="100%" fill="white" mask="url(#ellipse-mask)" />
         <Ellipse cx="50" cy="50" rx="30" ry="40" fill="none" stroke="black" stroke-width="1" />
      </Svg>

   )
}

