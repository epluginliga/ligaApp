import React from 'react';

import VStack from '../../components/Views/Vstack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RouteApp } from '../../@types/navigation';
import { data as eventoDetalhe } from '../../../store/eventoId';
import { Imagem } from '../../components/Imagem';
import { Section } from '../../components/Section';
import { IconCalendario, IconClock, IconPin } from '../../icons';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Html } from '../../components/Html';
import { formataData } from '../../utils/utils';

type EventoDetalheRouteProp = RouteProp<RouteApp, 'EventosDetalhe'>;

export function EventosDetalhe() {
   const { params } = useRoute<EventoDetalheRouteProp>();
   console.log(params.id);
   const { navigate } = useNavigation();

   return (
      <>
         <Layout.Scroll>
            <VStack mb="md" gap="sm" width="100%">

               <Imagem source={{ uri: eventoDetalhe.path_imagem }} />

               <Section.Root>
                  <Section.Title>{eventoDetalhe.nome}</Section.Title>

                  <Section.SubTitle iconLeft={<IconCalendario />}>
                     {formataData(eventoDetalhe.data_evento).DiaMesAnoTexto()}
                  </Section.SubTitle>

                  <Section.SubTitle iconLeft={<IconClock />}>
                     {formataData(eventoDetalhe.data_evento).hora()}
                  </Section.SubTitle>

                  <VStack gap="lg">
                     <Section.SubTitle iconLeft={<IconPin />}>
                        {eventoDetalhe.nome_local + '\n'}
                        <Section.Span>
                           {eventoDetalhe.logradouro}
                        </Section.Span>
                     </Section.SubTitle>

                     <Html source={eventoDetalhe.descricao} />
                  </VStack>

               </Section.Root>

            </VStack>
         </Layout.Scroll>
         <VStack p="sm">
            <Button onPress={() => navigate('Login')}>Comprar</Button>
         </VStack>
      </>
   )
}
