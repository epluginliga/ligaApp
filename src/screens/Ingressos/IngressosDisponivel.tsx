import React, { useContext } from 'react'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import VStack from '../../components/Views/Vstack'
import { Card } from '../../components/Card'
import { Icon } from '../../icons'
import { FlatList } from 'react-native'
import Text from '../../components/Text'
import { Layout } from '../../components/Views/Layout'
import { StepContext } from '.'
import { IngressosPayload } from '../../services/eventos'
import { formataData } from '../../utils/utils'
import { ListEmptyComponent } from '../../components/ListEmptyComponent'

export function IngressosDisponivel() {
   const navigate = useNavigation();
   const { proximoEventos } = useContext(StepContext);

   function Item({ item }: { item: IngressosPayload }) {
      const dataISO = formataData().converteDataBRtoISO(item.evento_data_evento)
      const dataEvento = formataData(dataISO);

      return (
         <Card.Root
            marginHorizontal="sm"
            pr="xs"
            onPress={() => navigate.navigate("IngressosDetalhe", { id: item.bilhete_id })}>
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item?.evento_path_imagem }} />

            <VStack flex={2} justifyContent='space-around'>
               <Card.Title lineHeight={22.5} mt='sm'>{item.evento_nome}</Card.Title>

               <Card.SubTitle leftIcon={<Icon.Calendario size={16} />} >
                  {dataEvento.diaSemana()}, {'\n'}
                  {`${dataEvento.diaMes()} de ${dataEvento.nomeFullMes()}`}
               </Card.SubTitle>


               <Card.SubTitle leftIcon={<Icon.Pin size={16} />} >
                  item.local {'\n'}
                  <Card.Span>
                     {
                        item.evento_cidade} | {item.evento_estado} - {dataEvento.hora() || 'hora não definida'
                     }
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
            ListEmptyComponent={<ListEmptyComponent title='Nenhum Ingresso disponível' />}
            ListHeaderComponent={<Layout.Header title='Ingressos disponíveis'
               mb='md'
            />}
            renderItem={Item}
            keyExtractor={(item) => item.bilhete_id}
            ItemSeparatorComponent={() => <VStack height={20} />}
            data={proximoEventos}
         />
      </Animated.View>

   )
}
