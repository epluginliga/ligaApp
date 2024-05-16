import React from 'react'
import { Icon } from '.';
import { Path, Svg } from 'react-native-svg';

export function IconPlus({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 448 512" fill="none">
         <Path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill={color} />
      </Svg>
   );
}
