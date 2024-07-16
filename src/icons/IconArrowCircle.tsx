
import React from 'react'
import { Icon } from '.';
import { Path, Svg } from 'react-native-svg';

export function IconArrowLeftCircle({ size = 24, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox={`0 0 512 512`} fill="none" >
         <Path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" fill={color} />
      </Svg>
   );
}