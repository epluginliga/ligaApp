import { BoxProps, VariantProps, createBox, createRestyleComponent, createVariant } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import React from 'react';





const Box = createBox<Theme>();
const View = createRestyleComponent<
   VariantProps<Theme, 'HStack'> & React.ComponentProps<typeof Box>,
   Theme
>([createVariant({ themeKey: 'HStack' })], Box);

export type HStack = BoxProps<Theme> & {
   children?: React.ReactNode;
   variant?: "shadow"
}

function HStack({ children, variant, ...props }: HStack) {
   return (
      <View flexDirection='row'
         variant={variant} gap='sm' {...props}>
         {children}
      </View>
   );
}
export default HStack;
