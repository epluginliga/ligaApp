
import React from 'react';
import { Input, InputDefault } from '.';
import { UseMutationResult } from '@tanstack/react-query';
import { PayloadObtemEnderecoCep } from '../../services/sercicosExternos';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import theme from '../../theme/default';
import { cepMask } from '../../utils/Maskara';

type InputCepProps = InputDefault & {
   name: string;
   control: any;
   mask?: (val: string) => string;
   editable?: boolean;
   handleCep: UseMutationResult<PayloadObtemEnderecoCep, Error, number, unknown>;
}

export function InputCep({ name, control, handleCep, ...rest }: InputCepProps) {
   return (
      <Input {...rest}>
         <Controller
            name={name}
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => {
               return (
                  <TextInput
                     placeholderTextColor={rest.variant ? theme.colors.white : theme.colors.bege_900}
                     onChangeText={(text) => onChange(cepMask(text))}
                     value={value}
                     onBlur={() => handleCep.mutate(value.replace(/\D/g, ''))}
                     style={{
                        fontSize: theme.spacing.md,
                        fontFamily: theme.fonts.medium,
                        color: theme.colors.bege_900,
                        borderColor: theme.colors.primary,
                        flex: 1,
                     }}
                     {...rest}
                  />
               )
            }}
         />
      </Input>
   )
}