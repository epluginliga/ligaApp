import { BackgroundColorProps, BoxProps, createBox } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import React from 'react';

const Box = createBox<Theme>();

export type VStack = BoxProps<Theme> & {
   children?: React.ReactNode
}

function VStack({ children, ...props }: VStack) {
   return (
      <Box {...props}>
         {children}
      </Box>
   );
}
export default VStack;