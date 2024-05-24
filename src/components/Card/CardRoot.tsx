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
import Text from '../Text';
import VStack from '../Views/Vstack';

type TitleProps = string | React.ReactNode;

export type CardRoot = BoxProps<Theme> & {
   children: React.ReactNode | React.ReactNode[];
   onPress?(): void;
   variant?: "shadow" | "border";
   title?: TitleProps;
}

const Box = createBox<Theme>();
const Card = createRestyleComponent<
   VariantProps<Theme, 'card'> & React.ComponentProps<typeof Box>,
   Theme
>([createVariant({ themeKey: 'card' })], Box);

function Title({ title }: { title: TitleProps }) {
   if (!title) {
      return;
   }

   if (typeof title === "string") {
      return <Text variant='header'>{title}</Text>
   }

   return title;
}

export function CardRoot({ children, onPress, title, variant = 'shadow', paddingHorizontal = 'sm', ...rest }: CardRoot) {
   return (
      <VStack paddingHorizontal={paddingHorizontal}>
         <Title title={title} />

         <Pressable onPress={() => onPress?.()}>
            <Card
               flexDirection="row"
               borderRadius={12}
               backgroundColor='white'
               variant={variant}
               justifyContent="space-between"
               alignItems='center'
               gap='sm'
               {...rest}
            >
               {children}
            </Card>
         </Pressable>
      </VStack>
   );
}
