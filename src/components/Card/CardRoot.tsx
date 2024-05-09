import React from 'react'
import { Pressable } from 'react-native';

import {
   BoxProps,
   VariantProps,
   createBox,
   createRestyleComponent,
   createVariant
} from '@shopify/restyle';
import { Theme } from '../../theme/default';

export type CardRoot = BoxProps<Theme> & {
   children: React.ReactNode | React.ReactNode[];
   onPress?(): void;
}

const Box = createBox<Theme>();
const Card = createRestyleComponent<
   VariantProps<Theme, 'card'> & React.ComponentProps<typeof Box>,
   Theme
>([createVariant({ themeKey: 'card' })], Box);

export function CardRoot({ children, onPress, ...rest }: CardRoot) {
   return (
      <Pressable onPress={() => onPress?.()}>
         <Card
            flexDirection="row"
            flex={1}
            borderRadius={12}
            backgroundColor='white'
            variant='shadow'
            justifyContent="space-between"
            alignItems='center'
            gap='sm'
            {...rest}
         >
            {children}
         </Card>
      </Pressable>
   );
}
