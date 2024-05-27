import React from 'react'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import VStack from '../../components/Views/Vstack'
import { Card } from '../../components/Card'
import { data } from '../../../store/ingressos'
import { Icon } from '../../icons'
import { FlatList, Pressable } from 'react-native'
import Text from '../../components/Text'

export function IngressosDisponivel() {
   const navigate = useNavigation();
   const item = data.data[0];

   function Item() {
      return (
         <Card.Root
            marginHorizontal="sm"
            pr="xs"
            onPress={() => navigate.navigate("IngressosDetalhe", { id: item.bilhete_id })}>
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item.path_imagem }} />

            <VStack flex={2} justifyContent='space-around'>
               <Card.Title lineHeight={22.5} mt='sm'>{item.evento_nome}</Card.Title>

               <Card.SubTitle leftIcon={<Icon.Calendario size={16} />} >
                  {item.evento_data_evento}
               </Card.SubTitle>

               <Card.SubTitle leftIcon={<Icon.Pin size={16} />} >
                  item.local {'\n'}
                  <Card.Span>
                     {item.evento_cidade} | {item.evento_estado} - {item?.hora_evento + 'h' || 'hora não definida'}
                  </Card.Span>
               </Card.SubTitle>

               <VStack alignItems='flex-start' marginVertical='sm' >
                  <VStack backgroundColor='black' paddingHorizontal='md' borderRadius={6}>
                     <Text textAlign='center' color='white' variant='header3'>
                        Ver informações
                     </Text>
                  </VStack>
               </VStack>

            </VStack>
         </Card.Root>
      )
   }

   return (
      <Animated.View
         entering={FadeInRight}
         exiting={FadeOutRight}
         style={[{ flex: 1 }]}
      >
         <FlatList
            renderItem={Item}
            keyExtractor={(item) => item.bilhete_id}
            data={data.data}
         />

      </Animated.View>

   )
}
