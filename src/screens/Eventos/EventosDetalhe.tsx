import React from 'react';

import VStack from '../../components/Views/Vstack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteApp } from '../../@types/navigation';
import { data as eventoDetalhe } from '../../../store/eventoId';
import { Imagem } from '../../components/Imagem';
import { Section } from '../../components/Section';
import { IconCalendario, IconClock, IconPin } from '../../icons';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Html } from '../../components/Html';

type EventoDetalheRouteProp = RouteProp<RouteApp, 'EventosDetalhe'>;

export function EventosDetalhe() {
   const { params } = useRoute<EventoDetalheRouteProp>();
   console.log(params.id);

   return (
      <Layout.Scroll>
         <VStack mb="md" gap="sm" width="100%">

            <Imagem source={{ uri: eventoDetalhe.path_imagem }} />

            <Section.Root>
               <Section.Title>{eventoDetalhe.nome}</Section.Title>

               <Section.SubTitle iconLeft={<IconCalendario />}>
                  {eventoDetalhe.data_evento}
               </Section.SubTitle>

               <Section.SubTitle iconLeft={<IconClock />}>
                  {eventoDetalhe.data_evento}
               </Section.SubTitle>

               <VStack gap="lg">
                  <Section.SubTitle iconLeft={<IconPin />}>
                     {eventoDetalhe.data_evento}
                     {'\n'}
                     <Section.Span>
                        {eventoDetalhe.logradouro}
                     </Section.Span>
                  </Section.SubTitle>


                  <Html source={eventoDetalhe.descricao} />
               </VStack>

            </Section.Root>
            <Button>Comprar</Button>

         </VStack>
      </Layout.Scroll>

   )
}
