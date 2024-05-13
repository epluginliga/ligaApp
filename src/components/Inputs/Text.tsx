import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useTheme } from '@shopify/restyle'

import { Theme } from '../../theme/default'
import { Input, InputDefault } from '.'

type InputText = InputDefault & {
   name: string;
   control: any;
}

export function InputText({ name, ...rest }: InputText) {
   const theme = useTheme<Theme>();
   return (
      <Input {...rest}>
         <Controller
            name={name}
            rules={{ required: true }}
            control={rest.control}
            render={({ field: { onBlur, onChange, value } }) => {
               return (
                  <TextInput
                     placeholderTextColor={theme.colors.white}
                     onChangeText={onChange}
                     value={value}
                     onBlur={onBlur}
                     style={{
                        fontSize: theme.spacing.md,
                        color: theme.colors.white,
                        fontFamily: theme.fonts.medium,
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

