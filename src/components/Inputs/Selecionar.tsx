import React from 'react'
import { Controller } from 'react-hook-form'
import { Pressable } from 'react-native'

import { InputDefault } from '.'
import HStack from '../Views/Hstack'
import Text from '../Text'
import { Icon } from '../../icons'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'

type InputText = InputDefault & {
   name: string;
   id: string;
   control: any;
   callback?: (val: any) => void;
}

export function InputSelecionar({ id, name, label, callback, ...rest }: InputText) {
   return (
      <Controller
         name={name}
         rules={{ required: true }}
         control={rest.control}
         render={({ field: { onChange, value } }) => {
            return (
               <Pressable onPress={() => {
                  callback?.({ id, name, label })
                  onChange(id);
               }}>
                  <HStack padding='sm' justifyContent='space-between'>
                     <Text variant='body'>{label}</Text>
                     {value === id && (
                        <Animated.View
                           entering={FadeInRight}
                           exiting={FadeOutRight}>
                           <Icon.CheckCircle />
                        </Animated.View>
                     )}
                  </HStack>
               </Pressable>
            )
         }}
      />
   )
}

