import React from 'react'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import VStack from '../../components/Views/Vstack'
import { Card } from '../../components/Card'
import { Icon } from '../../icons'
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native'
import Text from '../../components/Text'
import { Layout } from '../../components/Views/Layout'
import { dataApp } from '../../utils/utils'
import { ListEmptyComponent } from '../../components/ListEmptyComponent'
import { IngressosPayload } from '../../services/@eventos'
import HStack from '../../components/Views/Hstack'
import { useQuery } from '@tanstack/react-query'
import { fetchProximoIngressoComprado } from '../../services/eventos'

type IconeTipoIngresso = {
   [key: number]: {
      icon: React.ReactNode,
      nome: string;
   }
};
const iconeTipoIngresso: IconeTipoIngresso = {
   0: {
      icon: <Icon.QRCode size={16} />,
      nome: "Entrada por QR Code",
   },
   1: {
      icon: <Icon.FaceID size={16} />,
      nome: "Entrada por reconhecimento facial",
   }
}

export function IngressosDisponivel() {
   const navigate = useNavigation();

   const { data } = useQuery({
      queryKey: ['ingressosFuturosComprados'],
      queryFn: fetchProximoIngressoComprado,
      refetchOnMount: false
   });

   function Item({ item }: { item: IngressosPayload }) {
      const dataISO = dataApp().converteDataBRtoISO(item.evento_data_evento)
      const dataEvento = dataApp(dataISO);

      return (
         <Card.Root
            marginHorizontal="sm"
            pr="xs"
         >
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item?.evento_path_imagem }} />

            <VStack flex={2} justifyContent='space-around' >
               <Card.Title fontSize={18} lineHeight={22.5} my='sm'>{item.evento_nome}</Card.Title>

               <VStack gap='sm'>
                  <Card.SubTitle leftIcon={<Icon.Calendario size={16} />} >
                     {dataEvento.diaSemana()}
                     {`, ${dataEvento.diaMes()} de ${dataEvento.nomeFullMes()}`}
                  </Card.SubTitle>

                  <Card.Span leftIcon={<Icon.Pin size={16} />}>
                     {item.evento_cidade} | {item.evento_estado} - {dataEvento.hora() || 'hora não definida'}
                  </Card.Span>

                  <Card.Span leftIcon={iconeTipoIngresso[item.ingresso_necessario_aprovacao_imagem].icon}>
                     {iconeTipoIngresso[item.ingresso_necessario_aprovacao_imagem].nome}
                  </Card.Span>
               </VStack>

               <HStack alignItems='flex-start' mr='xs' justifyContent='space-evenly' marginVertical='sm' mt='md'>
                  {item.pode_transferir ? (
                     <TouchableOpacity
                        onPress={() => navigate.navigate("IngressoTranserir", {
                           ingresso_id: item.bilhete_id
                        })}
                     >
                        <HStack backgroundColor='greenDark' paddingHorizontal='md' py='xs' borderRadius={6}>
                           <Text textAlign='center' color='white' variant='header3'>
                              Transferir
                           </Text>
                        </HStack>
                     </TouchableOpacity>
                  ) : null}

                  {!item.ingresso_necessario_aprovacao_imagem ? (
                     <Pressable onPress={() => navigate.navigate("IngressosDetalhe", {
                        bilhete_id: item.bilhete_id,
                     })}>
                        <HStack backgroundColor='black' paddingHorizontal='md' py='xs' borderRadius={6}>
                           <Text textAlign='center' color='white' variant='header3'>
                              Informações
                           </Text>
                        </HStack>
                     </Pressable>
                  ) : null}
               </HStack>

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
         <Layout.Header title='Ingressos disponíveis' />
         <FlatList
            contentContainerStyle={{
               marginTop: 16
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ListEmptyComponent title='Nenhum Ingresso disponível' />}
            renderItem={Item}
            keyExtractor={(item) => item.bilhete_id}
            ItemSeparatorComponent={() => <VStack height={20} />}
            ListFooterComponent={<View style={{ marginBottom: 32 }} />}
            data={data?.data}
         />
      </Animated.View>

   )
}
