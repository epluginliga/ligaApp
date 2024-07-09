import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Card } from '../Card';
import VStack from '../Views/Vstack';
import { Icon } from '../../icons';

type ListEmptyComponent = {
   title?: string;
   icon?: React.ReactNode;
}
export function ListEmptyComponent({ title = 'Nada encontrado!', icon }: ListEmptyComponent) {
   return (
      <VStack flex={1} alignContent='center' justifyContent='center'>
         <Card.Root gap='lg' paddingVertical='lg' flexDirection='column' justifyContent='center' alignItems='center'>
            {icon ?? <Icon.Warning size={30} />}
            <Card.Title color='bege_200'>{title}</Card.Title>
         </Card.Root>
      </VStack>
   )
}
