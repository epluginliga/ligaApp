import React, { useContext } from 'react'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import VStack from '../../components/Views/Vstack'
import { Card } from '../../components/Card'
import { Icon } from '../../icons'
import { FlatList, View } from 'react-native'
import Text from '../../components/Text'
import { Layout } from '../../components/Views/Layout'
import { StepContext } from '.'
import { formataData } from '../../utils/utils'
import { ListEmptyComponent } from '../../components/ListEmptyComponent'
import { IngressosPayload } from '../../services/@eventos'
import HStack from '../../components/Views/Hstack'

type IconeTipoIngresso = {
   [key: number]: {
      icon: React.ReactNode,
      nome: string;
   }
};
const iconeTipoIngresso: IconeTipoIngresso = {
   0: {
      icon: <Icon.QRCode size={16} />,
      nome: "Entrada com QR Code",
   },
   1: {
      icon: <Icon.FaceID size={16} />,
      nome: "Entrada com Leitura facial",
   }
}

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
            onPress={() => {
               if (item.ingresso_necessario_aprovacao_imagem) return;

               navigate.navigate("IngressosDetalhe", {
                  bilhete_id: item.bilhete_id,
               })
            }}>
               
            <Card.Image
               flex={1}
               height={88}
               source={{ uri: item?.evento_path_imagem }} />

            <VStack flex={2} justifyContent='space-around' pb='sm'>
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

               {!item.ingresso_necessario_aprovacao_imagem ? (
                  <VStack alignItems='flex-start' marginVertical='sm' mt='md'>
                     <HStack backgroundColor='black' paddingHorizontal='md' borderRadius={6}>
                        <Text textAlign='center' color='white' variant='header3'>
                           Ver informações
                        </Text>
                     </HStack>
                  </VStack>
               ) : null}

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
            data={proximoEventos}
         />
      </Animated.View>

   )
}
