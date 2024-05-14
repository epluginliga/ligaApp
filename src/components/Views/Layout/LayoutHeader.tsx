import React from 'react'
import HStack from '../Hstack'
import { IconArrowLeft } from '../../../icons/IconArrow'
import Text from '../../Text'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type LayoutHeader = {
   title?: string
}

export function LayoutHeader({ title }: LayoutHeader) {
   const { goBack } = useNavigation();

   return (
      <Pressable onPress={goBack}>
         <HStack marginHorizontal="md" marginVertical="sm" alignItems='center'>
            <IconArrowLeft />
            <Text variant='header' textAlign="center">{title}</Text>
         </HStack>
      </Pressable>
   )
}
