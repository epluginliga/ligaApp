import { BoxProps, createBox } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import React from 'react';

const Box = createBox<Theme>();

export type HStack = BoxProps<Theme> & {
   children: React.ReactNode
}

function HStack({ children, ...props }: HStack) {
   return (
      <Box flex={1} flexDirection='row' gap='sm' {...props}>{children}</Box>
   );
}
export default HStack;
