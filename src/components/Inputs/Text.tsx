import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { border, useTheme } from '@shopify/restyle'

import { Theme } from '../../theme/default'
import { Input, InputDefault } from '.'

type InputText = InputDefault & {
   name: string;
   control: any;
}

export function InputText({ name, ...rest }: InputText) {
   const theme = useTheme<Theme>();

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
      <Input {...rest}>
         <Controller
            name={name}
            rules={{ required: true }}
            control={rest.control}
            render={({ field: { onBlur, onChange, value } }) => {
               return (
                  <TextInput
                     placeholderTextColor={rest.variant ? theme.colors.white : theme.colors.bege_900}
                     onChangeText={onChange}
                     value={value}
                     onBlur={onBlur}
                     style={{
                        fontSize: theme.spacing.md,
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
