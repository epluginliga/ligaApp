import React from 'react';
import { Icon } from '.';
import { Path, Svg } from 'react-native-svg';

export function IconUpRightFromSquare({ size = 21, color = '#F2385A' }: Icon) {
   return (
      <Svg
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         strokeWidth={1.5}
         stroke={color}
      >
         <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
         />
      </Svg>
   );
}
