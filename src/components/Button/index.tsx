import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import {
   SpacingProps,
   VariantProps,
   createRestyleComponent,
   createText,
   createVariant,
   spacing
} from '@shopify/restyle';

import { Theme } from '../../theme/default';
import { Icon } from '../../icons';

const Text = createText<Theme>();

type CustomButton = SpacingProps<Theme> & VariantProps<Theme, 'buttonVariants'> & TouchableOpacityProps & {
   children?: React.ReactNode | string;
   iconLeft?: React.JSX.Element;
   iconRight?: React.JSX.Element;
}

const Box = createRestyleComponent<CustomButton, Theme>([
   spacing,
   createVariant({ themeKey: "buttonVariants" }),
]);

export function Button({ children, onPress, iconLeft, iconRight, ...props }: CustomButton) {
   return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
         <Box padding='md'  {...props}>
            {/* {iconRight && iconRight} */}

            {typeof children !== "string" ? (
               children
            ) : (
               <Text variant={props.variant === "link" ? 'botaoLink' : "botaoDefault"} color='white'>
                  {children}
               </Text>
            )}

            {props.variant !== "link" ? iconLeft ? iconLeft : <Icon.ArrowRight size={24} color='#fff' /> : null}
         </Box>
      </TouchableOpacity>
   )
}
