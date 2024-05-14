import React, { useState } from 'react'
import { Pressable, TextInput, TextInputProps } from 'react-native'
import { useTheme } from '@shopify/restyle'

import { Theme } from '../../theme/default'
import { Icon } from '../../icons'
import { Input, InputDefault } from '.'
import { Controller } from 'react-hook-form'

type InputPassworld = InputDefault & {
   name: string;
   control: any;
}

export function InputPassword({ name, ...rest }: InputPassworld) {
   const theme = useTheme<Theme>();
   const [hidde, setHidde] = useState(true);

   const style: { solid: object; transparent: object } = {
      solid: {
         color: theme.colors.white,
      },
      transparent: {
         color: theme.colors.bege_900,
         borderColor: theme.colors.primary,
      }
   }

   return (
      <Input {...rest}
         iconRight={(
            <Pressable onPress={() => setHidde(!hidde)}>
               {hidde ? (
                  <Icon.Eye color={rest.variant ? theme.colors.white : theme.colors.secondary} size={24} />
               ) : <Icon.EyeSlash color={rest.variant ? theme.colors.white : theme.colors.secondary} size={24} />}
            </Pressable>
         )}>
         <Controller
            name={name}
            rules={{ required: true }}
            control={rest.control}
            render={({ field: { onBlur, onChange, value } }) => {
               return (
                  <TextInput
                     placeholderTextColor={rest.variant ? theme.colors.white : theme.colors.bege_900}
                     secureTextEntry={hidde}
                     onChangeText={(text) => onChange(text)}
                     value={value}
                     onBlur={onBlur}
                     autoCapitalize='none'
                     style={{
                        fontSize: theme.spacing.md,
                        color: theme.colors.white,
                        fontFamily: theme.fonts.medium,
                        ...style[rest.variant || "transparent"],
                        flex: 1
                     }}
                     {...rest}
                  />
               )
            }}
         />
      </Input>
   )
}

