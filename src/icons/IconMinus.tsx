import React from 'react'
import { Icon } from '.';
import { Path, Svg } from 'react-native-svg';

export function IconMinus({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 448 512" fill="none">
         <Path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" fill={color} />
      </Svg>
   );
}

