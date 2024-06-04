import React from 'react'

import { Section } from '../Section'
import { formataData } from '../../utils/utils'
import { Icon } from '../../icons'
import VStack from '../Views/Vstack'
import { useCarrinho } from '../../hooks/carrinho'

export function ResumoPedido() {
   const { evento } = useCarrinho();

   if (!evento) return null;

   return (
      <Section.Root>
         <Section.Title>{evento?.nome}</Section.Title>

         <Section.SubTitle iconLeft={<Icon.Calendario />}>
            {formataData(evento?.data_evento).diaMesAnoTexto()}
         </Section.SubTitle>

         <Section.SubTitle iconLeft={<Icon.Clock />}>
            {formataData(evento.data_evento).hora()}
         </Section.SubTitle>

         <VStack gap="xs">
            <Section.SubTitle iconLeft={<Icon.Pin />}>
               {evento.nome_local + '\n'}
               <Section.Span>
                  {evento.logradouro}
               </Section.Span>
            </Section.SubTitle>
         </VStack>
      </Section.Root>
   )
}
