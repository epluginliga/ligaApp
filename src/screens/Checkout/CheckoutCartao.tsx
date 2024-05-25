import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import Text from '../../components/Text'
import { ResumoPedido } from '../../components/ResumoPedido'
import { data } from '../../../store/eventoId'
import { CartaoWidget, ITemCardActions } from '../../components/Cartao'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputText } from '../../components/Inputs/Text'
import { Button } from '../../components/Button'
import { Icon } from '../../icons'

const schema = z.object({
   number: z.string(),
   holder_name: z.string(),
   cvv: z.string(),
   validade: z.string(),
   brand: z.string(),
});
type Form = z.input<typeof schema>;

function FormCartaoCredito() {
   const { control, formState: { errors }, watch } = useForm<Form>({
      resolver: zodResolver(schema)
   });
   const controlaWidgetCartao = useRef<ITemCardActions>(null);

   return (
      <VStack marginHorizontal='sm' gap='lg'>
         <CartaoWidget ref={controlaWidgetCartao} item={watch()} />

         <VStack gap='md'>
            <InputText
               label='Número do cartão'
               control={control}
               name='number'
               placeholder='00000000000'
               error={errors?.number?.message}
               onPress={() => controlaWidgetCartao.current?.back?.()}
            />

            <InputText
               label='Nome do titular'
               control={control}
               name='holder_name'
               placeholder='Nome impresso no cartão'
               error={errors?.holder_name?.message}
               onPress={() => controlaWidgetCartao.current?.front?.()}

            />

            <InputText
               label='Validade'
               control={control}
               name='validade'
               placeholder='00/00'
               error={errors?.validade?.message}
               onPress={() => controlaWidgetCartao.current?.back?.()}
            />

            <InputText
               label='Código CVV'
               control={control}
               name='cvv'
               placeholder='000'
               error={errors?.cvv?.message}
               onPress={() => controlaWidgetCartao.current?.back?.()}
            />
         </VStack>

         <Button iconRight={<Icon.CheckCircle color='#fff' />}>FINALIZAR COMPRA</Button>

      </VStack>
   )
}

export function CheckoutCartao() {
   const { navigate } = useNavigation();

   return (
      <Layout.Root>
         <Layout.Keyboard>

            <Layout.Header title='Checkout' />

            <Layout.Scroll>

               <VStack gap='xl' justifyContent='space-between' flex={1} marginBottom='lg'>
                  <VStack gap='md' >
                     <Text variant='header' marginLeft='md'>Resumo do pedido</Text>

                     <ResumoPedido data={data} />

                     <FormCartaoCredito />

                  </VStack>
               </VStack>

            </Layout.Scroll>
         </Layout.Keyboard>
      </Layout.Root>

   )
}
