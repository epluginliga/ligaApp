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

               <Button
                  disabled={!formaPagamento}
                  onPress={() => navigate(formaPagamento)}
                  marginHorizontal="md">
                  Continuar
               </Button>
            </Section.Root>
         </VStack>

      </Layout.Root>
   )
}
