import React from 'react';

import { BoxProps, VariantProps, createBox, createRestyleComponent, createVariant } from '@shopify/restyle';
import { Theme } from '../../theme/default';

const Box = createBox<Theme>();
const View = createRestyleComponent<
   VariantProps<Theme, 'VStack'> & React.ComponentProps<typeof Box>,
   Theme
>([createVariant({ themeKey: 'VStack' })], Box);

export type VStackProps = BoxProps<Theme> & {
   children?: React.ReactNode;
   variant?: "shadow"
}

function VStack({ children, variant, ...props }: VStackProps) {
   return (
      <View variant={variant} {...props}>
         {children}
      </View>
   );
}
export default VStack;
