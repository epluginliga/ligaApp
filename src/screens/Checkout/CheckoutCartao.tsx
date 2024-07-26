import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { ResumoPedido } from '../../components/ResumoPedido'
import { CartaoWidget, ITemCardActions } from '../../components/Cartao'
import { Button } from '../../components/Button'
import HStack from '../../components/Views/Hstack'
import { AnimateView } from '../../components/AnimateView'
import { InputSelecionar } from '../../components/Inputs/Selecionar'
import { InputText } from '../../components/Inputs/Text'
import { Icon } from '../../icons'

import { checkout, tokenCartao } from '../../services/checkout'
import { CartaoCredito } from '../../utils/CartaoCredito'

import { useCarrinho } from '../../hooks/carrinho'
import { Maskara } from '../../utils/Maskara'
import { CVV, HOLDER_NAME_CARD, NUMBER_CARD, VALIDADE_CARD } from '@env';
import { z } from 'zod'

const schema = z.object({
   number: z.string(),
   holder_name: z.string(),
   cvv: z.string(),
   validade: z.string(),
   parcelas: z.string(),

});
type Form = z.input<typeof schema>;

type ParcelasProps = {
   name: string;
   control: any;
   label?: string;
   placeholder?: string;
   error?: string
}
function Parcelas({ ...rest }: ParcelasProps) {
   const { evento, valorFinal } = useCarrinho();
   if (!evento) return;

   let parcelas = [{ name: '1', label: `1x de ${Maskara.dinheiro(valorFinal)}` }];
   for (let index = 0; index < evento?.quantidade_parcelas; index++) {
      const parcelaIndice = index + 1;
      if (index > 0) {
         const valorParcela = valorFinal * evento?.taxas?.taxasparcelamento[index] / parcelaIndice;
         parcelas = [...parcelas, { name: `${parcelaIndice}`, label: `${parcelaIndice}x de ${Maskara.dinheiro(valorParcela)}` }]
      }
   }

   return <InputSelecionar option={parcelas} {...rest} />
}

function FormCartaoCredito() {
   const controlaWidgetCartao = useRef<ITemCardActions>(null);
   const { navigate } = useNavigation();
   const insets = useSafeAreaInsets();
   const { carrinhoId } = useCarrinho();

   const { control, handleSubmit, formState: { errors }, watch } = useForm<Form>({
      resolver: zodResolver(schema),
      defaultValues: {
         holder_name: HOLDER_NAME_CARD,
         number: NUMBER_CARD,
         cvv: CVV,
         validade: VALIDADE_CARD
      }
   });

   const handleTokenCartao = useMutation({
      mutationFn: async (cartao: Form) => {
         const cartaoToken = await tokenCartao(CartaoCredito.formataBodyTokenCartao({
            ...cartao,
            number: cartao.number.replace(/\D/g, '')
         }));

         return checkout({
            parcelas: +cartao.parcelas,
            tipo_pagamento: "cartao_credito",
            "pagarmetoken-0": cartaoToken.id,
            cvc: cartao.cvv,
            expiry: `${cartaoToken.card.exp_month} / ${cartaoToken.card.exp_year}`,
            name: cartaoToken.card.holder_name,
            number: cartao.number,
            dados_pagamento: {
               num_cartao: cartao.number,
               cvc: cartao.cvv,
               brand: cartaoToken.card.brand,
               cardtoken: cartaoToken.id,
               month: cartaoToken.card.exp_month,
               year: cartaoToken.card.exp_year,
               nome_cartao: cartaoToken.card.holder_name,
            },

         }, carrinhoId)
      },
      onSuccess(success: any) {
         return navigate(success?.status == "falha" ? "CheckoutFalha" : "CheckoutSucesso", {
            codigo: success?.mensagem_adquirencia?.codigo,
            mensagem: success?.mensagem_adquirencia?.mensagem
         });
      },
      onError() {
         navigate("CheckoutProcessandoPagamento")
      },
   });

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

            <Parcelas
               placeholder='Selecione a parcela'
               label='parcela'
               name={`parcelas`}
               control={control}
               error={errors?.parcelas?.message}
            />
         </VStack>

         <Button
            loading={handleTokenCartao.isPending}
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
