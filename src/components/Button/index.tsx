import React from 'react'
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
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
   iconRight?: React.JSX.Element | boolean;
   loading?: boolean;
}

const Box = createRestyleComponent<CustomButton, Theme>([
   spacing,
   createVariant({ themeKey: "buttonVariants" }),
]);

export function Button({ children, onPress, iconLeft, iconRight, disabled = false, loading, ...props }: CustomButton) {
   return (
      <TouchableOpacity
         disabled={disabled}
         activeOpacity={0.7}
         onPress={onPress}
         style={{opacity: disabled ? 0.7 : 1}}
         >
         <Box padding='sm'  {...props}>
            {!loading && iconLeft && iconLeft}

            {typeof children !== "string" ? (
               children
            ) : (
               <Text variant={props.variant === "link" ? 'botaoLink' : "botaoDefault"} color='white'>
                  {loading ? <Text color='white'>Carregando...</Text> : children}
               </Text>
            )}

            {
              !loading && iconRight !== false ?
                  props.variant !== "link" ?
                     iconRight ? iconRight : <Icon.ArrowRight size={24} color='#fff' />
                     : null
                  : null
            }
         </Box>
      </TouchableOpacity>
   )
}
