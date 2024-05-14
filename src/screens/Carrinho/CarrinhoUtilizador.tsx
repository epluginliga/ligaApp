import React from 'react'
import { Text, View } from 'react-native'
import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import { formataData } from '../../utils/utils'
import { Icon } from '../../icons'
import VStack from '../../components/Views/Vstack'

import { data } from '../../../store/eventoId';
import { Card } from '../../components/Card'

export function CarrinhoUtilizador() {

   return (
      <Layout.Root>
         <Layout.Header title='Ingressos disponíveis' />
         <Layout.Scroll>

            <Section.Root>
               <Section.Title>{data.nome}</Section.Title>

               <Section.SubTitle iconLeft={<Icon.Calendario />}>
                  {formataData(data.data_evento).DiaMesAnoTexto()}
               </Section.SubTitle>

               <Section.SubTitle iconLeft={<Icon.Clock />}>
                  {formataData(data.data_evento).hora()}
               </Section.SubTitle>

               <VStack gap="xs">
                  <Section.SubTitle iconLeft={<Icon.Pin />}>
                     {data.nome_local + '\n'}
                     <Section.Span>
                        {data.logradouro}
                     </Section.Span>
                  </Section.SubTitle>
               </VStack>
            </Section.Root>

            <Card.Root>
               <Card.Title>1 lote</Card.Title>
            </Card.Root>

         </Layout.Scroll>
      </Layout.Root>
   )
}
