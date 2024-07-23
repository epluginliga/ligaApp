import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import Text from '../../components/Text'
import { Section } from '../../components/Section'
import { Card } from '../../components/Card'
import Circle from '../../components/Views/Circle'
import VStack from '../../components/Views/Vstack'
import { Button } from '../../components/Button'
import { Icon } from '../../icons'
import theme, { Theme } from '../../theme/default'
import { useTheme } from '@shopify/restyle'
import { useCarrinho } from '../../hooks/carrinho'
import { Maskara } from '../../utils/Maskara'
import { useMutation } from '@tanstack/react-query'
import { checkout } from '../../services/checkout'

type FormasPagamento = 'CheckoutCartao' | 'CheckoutPix';

type InputFormaPagamentoProps = {
   formaPagamento: FormasPagamento;
   setFormaPagamento: React.Dispatch<React.SetStateAction<"CheckoutCartao" | "CheckoutPix">>;
}

function InputFormaPagamento({ formaPagamento, setFormaPagamento }: InputFormaPagamentoProps) {
   const { colors } = useTheme<Theme>();
   return (
      <>
         <Card.Root
            onPress={() => setFormaPagamento('CheckoutCartao')}
            paddingHorizontal='none' variant='border'
         >
            <Icon.CredtCard size={30} />
            <Card.Title>Cartão de crédito</Card.Title>
            {formaPagamento === "CheckoutCartao" ?
               <Icon.CheckCircle size={20} color={colors.greenDark} /> :
               <Circle width={20} height={20} variant='shadow' />
            }
         </Card.Root>

         <Card.Root
            onPress={() => setFormaPagamento('CheckoutPix')}
            paddingHorizontal='none' variant='border'>
            <Icon.Pix size={30} />
            <Card.Title>PIX</Card.Title>
            {formaPagamento === "CheckoutPix" ?
               <Icon.CheckCircle size={20} color={colors.greenDark} /> :
               <Circle width={20} height={20} variant='shadow' />
            }
         </Card.Root>
      </>
   )
}

const nomePagamento = {
   CheckoutCartao: {
      nome: 'Cartão',
      icon: <Icon.CredtCard />
   },
   CheckoutPix: {
      nome: 'Pix',
      icon: <Icon.Pix />
   }
}

function PagamentoPix() {
   const { carrinhoId } = useCarrinho();
   const navigate = useNavigation();

   const handleCheckout = useMutation({
      mutationFn: () => checkout({ tipo_pagamento: "pix" }, carrinhoId),
      onSuccess(data) {
         // navigate.navigate("CheckoutPix", data.codigo_pagamento)
         navigate.navigate("CheckoutPix", {
            "tipo_pagamento": "pix",
            "cobranca_id": "98955413-5f8b-4217-a9b2-10421743bfcd",
            "codigo": "00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/9e2958a0-e410-4d94-b195-6a29f86b9845520400005303986540571.395802BR5923Pagar.me Pagamentos S.A6014RIO DE JANEIRO6229052575bae7cea6be8d86f081bfe8963046EF9",
            "nosso_numero": null,
            "url_view": "https://api.pagar.me/core/v5/transactions/tran_PBkqZAatKtwZpa4A/qrcode?payment_method=pix",
            "url_pdf_view": null,
            "url_view_codigo_barra": null,
            "vencimento": "2024-07-23T15:34:54Z",
            "id": "a7828bcf-c97b-47c0-9a45-d0eb754978be",
            "updated_at": "2024-07-23T15:14:55.000000Z",
            "created_at": "2024-07-23T15:14:55.000000Z"
         })
      },
   });

   return (
      <Button
         loading={handleCheckout.isPending}
         onPress={() => handleCheckout.mutate()}
         // onPress={() => navigate.navigate("CheckoutPix")}
         marginHorizontal="md">
         Continuar
      </Button>
   )
}
export function CheckoutPagamento() {
   const { navigate } = useNavigation();
   const [formaPagamento, setFormaPagamento] = useState<FormasPagamento>('CheckoutCartao');
   const { total, cupom, totalComDesconto, evento, setTaxa, taxa, valorFinal } = useCarrinho();

   const taxas = {
      CheckoutCartao: totalComDesconto * ((evento?.taxas?.taxaconveniencia || 1) / 100),
      CheckoutPix: totalComDesconto * ((evento?.taxas?.taxaconveniencia || 1) / 100),
   }

   const descontoObtido = total * (cupom.valor / 100);

   useEffect(() => {
      setTaxa(taxas[formaPagamento]);
   }, [formaPagamento])

   return (
      <Layout.Root>
         <Layout.Header title='Pagamento' />

         <VStack justifyContent='space-between' flex={1}>
            <Section.Root gap='md'>
               <Section.Title>Método de pagamento</Section.Title>

               <Section.SubTitle iconLeft={<Icon.Warning />}>
                  <Text fontSize={14} fontWeight="bold">Atenção</Text>,
                  você só garante seus ingressos após a conclusão da compra.
               </Section.SubTitle>

               <InputFormaPagamento formaPagamento={formaPagamento} setFormaPagamento={setFormaPagamento} />

            </Section.Root>

            <Section.Root variant='shadow' >
               <Section.Title >Seu pedido</Section.Title>

               <VStack gap='sm'>
                  <Section.SubTitle iconLeft={<Icon.Ticket size={18} />}>Subtotal: {Maskara.dinheiro(total)}</Section.SubTitle>

                  {cupom?.valor && (
                     <Section.SubTitle
                        color='greenDark'
                        fontWeight="bold"
                        iconLeft={<Icon.CheckCircle color={theme.colors.greenDark} size={18} />}>
                        Desconto: {Maskara.dinheiro(descontoObtido)}
                     </Section.SubTitle>
                  )}

                  <Section.SubTitle iconLeft={<Icon.Money size={18} />}>
                     Taxas: {Maskara.dinheiro(taxa)}
                  </Section.SubTitle>

                  <Section.SubTitle iconLeft={nomePagamento[formaPagamento].icon}>
                     Pagamento via: {nomePagamento[formaPagamento].nome}
                  </Section.SubTitle>

                  <Section.Title color='azul'>Total do pedido: {Maskara.dinheiro(valorFinal)}</Section.Title>
               </VStack>

               {
                  formaPagamento === "CheckoutCartao" ? (
                     <Button
                        disabled={!formaPagamento}
                        onPress={() => navigate(formaPagamento)}
                        marginHorizontal="md">
                        Continuar
                     </Button>
                  ) : (
                     <PagamentoPix />
                  )
               }
            </Section.Root>
         </VStack>

      </Layout.Root>
   )
}
