import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SpacingProps, VariantProps, createRestyleComponent, createText, createVariant, spacing } from '@shopify/restyle';
import { Theme } from '../../theme/default';

const Text = createText<Theme>();

type CustomButton = SpacingProps<Theme> & VariantProps<Theme, 'buttonVariants'> & TouchableOpacityProps & {
   children?: React.ReactNode | string;
}

const Box = createRestyleComponent<CustomButton, Theme>([
   spacing,
   createVariant({ themeKey: "buttonVariants" }),
]);

export function Button({ children, onPress, ...props }: CustomButton) {

   return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
         <Box  {...props}>
            {typeof children !== "string" ? (
               children
            ) : (
               <Text variant={props.variant === "link" ? 'botaoLink' : "header"} color='white'>
                  {children}
               </Text>
            )}
         </Box>
      </TouchableOpacity>

   )
}
