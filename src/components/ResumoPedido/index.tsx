import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Section } from '../Section'
import { formataData } from '../../utils/utils'
import { Icon } from '../../icons'
import VStack from '../Views/Vstack'
import { data as eventoID } from '../../../store/eventoId'

type ResumoPedidoProps = { data: typeof eventoID };

export function ResumoPedido({ data }: ResumoPedidoProps) {
   return (
      <Section.Root>
         <Section.Title>{data.nome}</Section.Title>

         <Section.SubTitle iconLeft={<Icon.Calendario />}>
            {formataData(data.data_evento).diaMesAnoTexto()}
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
   )

}
