import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { ResumoPedido } from '../../components/ResumoPedido'
import { CartaoWidget, ITemCardActions } from '../../components/Cartao'
import { InputText } from '../../components/Inputs/Text'
import { Button } from '../../components/Button'
import { Icon } from '../../icons'
import HStack from '../../components/Views/Hstack'
import { AnimateView } from '../../components/AnimateView'

import { tokenCartao } from '../../services/tokenCartao'
import { CartaoCredito } from '../../utils/CartaoCredito'

import { CVV, HOLDER_NAME_CARD, NUMBER_CARD, VALIDADE_CARD } from '@env';
import { z } from 'zod'
import { InputSelecionar } from '../../components/Inputs/Selecionar'
import { useCarrinho } from '../../hooks/carrinho'
import { Maskara } from '../../utils/Maskara'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const schema = z.object({
   number: z.string(),
   holder_name: z.string(),
   cvv: z.string(),
   validade: z.string(),
   parcelas: z.string(),

});
type Form = z.input<typeof schema>;

function FormCartaoCredito() {
   const { control, handleSubmit, formState: { errors }, watch } = useForm<Form>({
      resolver: zodResolver(schema),
      defaultValues: {
         holder_name: HOLDER_NAME_CARD,
         number: NUMBER_CARD,
         cvv: CVV,
         validade: VALIDADE_CARD
      }
   });
   const controlaWidgetCartao = useRef<ITemCardActions>(null);
   const { navigate } = useNavigation();
   const { evento, totalComDesconto } = useCarrinho();
   const insets = useSafeAreaInsets();

   const handleTokenCartao = useMutation({
      mutationFn: (cartao: Form) => tokenCartao(CartaoCredito.formataBodyTokenCartao(cartao)),
   })

   if (!evento) return;

   let totalPedido = totalComDesconto + totalComDesconto * ((evento?.taxas?.taxaconveniencia || 1) / 100);
   let parcelas = [{ name: '1', label: `1x de ${Maskara.dinheiro(totalPedido)}` }];

   for (let index = 0; index < evento?.quantidade_parcelas; index++) {
      const parcelaIndice = index + 1;
      if (index > 0) {
         const valorParcela = totalPedido * evento?.taxas?.taxasparcelamento[index] / parcelaIndice;
         parcelas = [...parcelas, { name: `${parcelaIndice}`, label: `${parcelaIndice}x de ${Maskara.dinheiro(valorParcela)}` }]
      }
   }

   return (
      <VStack
         marginHorizontal='sm'
         gap='lg'
         flex={1}
         justifyContent='space-between'>

         <CartaoWidget ref={controlaWidgetCartao} item={watch()} />

         <VStack gap='md' mb='lg'>
            <InputText
               label='Número do cartão'
               control={control}
               name='number'
               keyboardType='number-pad'
               mask={CartaoCredito.formataNumeroCartao}
               placeholder='0000 0000 0000 0000'
               error={errors?.number?.message}
               onPress={() => controlaWidgetCartao.current?.back?.()}
            />

            <InputText
               label='Nome do titular'
               control={control}
               name='holder_name'
               autoCapitalize="characters"
               mask={CartaoCredito.formataHoldName}
               placeholder='Nome impresso no cartão'
               error={errors?.holder_name?.message}
               onPress={() => controlaWidgetCartao.current?.front?.()}
            />

            <HStack>
               <InputText
                  keyboardType='number-pad'
                  maxLength={5}
                  label='Validade'
                  control={control}
                  name='validade'
                  mask={CartaoCredito.formataValidadeCartao}
                  placeholder='00/00'
                  error={errors?.validade?.message}
                  onPress={() => controlaWidgetCartao.current?.back?.()}
               />

               <InputText
                  label='CVV'
                  control={control}
                  name='cvv'
                  maxLength={3}
                  placeholder='000'
                  error={errors?.cvv?.message}
                  onPress={() => controlaWidgetCartao.current?.back?.()}
                  keyboardType='number-pad'
               />
            </HStack>

            <InputSelecionar
               placeholder='Selecione a parcela'
               label='parcela'
               name={`parcela`}
               control={control}
               option={parcelas}
               error={errors?.parcelas?.message}
            />
         </VStack>

         <Button
            style={{ marginBottom: insets.bottom }}
            onPress={handleSubmit((form) => handleTokenCartao.mutate(form))}
            iconRight={<Icon.CheckCircle color='#fff' />}>
            FINALIZAR COMPRA
         </Button>

      </VStack>
   )
}

export function CheckoutCartao() {
   return (
      <Layout.Keyboard>
         <Layout.Header title='Pagamento' />

         <Layout.Scroll>
            <VStack gap='md' justifyContent='space-between' flex={1} marginBottom='lg'>

               <ResumoPedido />

               <AnimateView delay={{ opacity: 300, offset: 150 }}>
                  <FormCartaoCredito />
               </AnimateView>
            </VStack>

         </Layout.Scroll>
      </Layout.Keyboard>
   )
}
