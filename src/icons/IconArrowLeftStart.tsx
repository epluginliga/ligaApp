

import React from 'react'
import { Icon } from '.';
import { Path, Svg } from 'react-native-svg';

export function IconArrowLeftStart({ size = 24, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox={`0 0 24 24`} fill="none" strokeWidth={1.5}  stroke={color}>
         <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"  />
      </Svg>
   );
}