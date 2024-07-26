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
import { useCheckout } from '../../hooks/checkout'
import { PedidoConcluidoCancelado } from '../../components/PedidoConcluidoCancelado'
import Temporizador from '../../components/Temporizador'
import { ActivityIndicator, Pressable } from 'react-native'
import { carrinhoStatusPagamento, CarrinhoStatusPagamentoPayload, deletaCarrinho } from '../../services/carrinho'
import { useAuth } from '../../hooks/auth'
import { ModalSmall } from '../../components/Modal/ModalSmall'
import HStack from '../../components/Views/Hstack'
import { EventosPayload } from '../../services/@eventos'
import { CheckoutPagamentoModalPagamentoIniciado } from './CheckoutPagamentoModal'

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

const statusPagamento: { [key: string]: "aguardando_pagamento" | "aguardando_pagamento_pix" } = {
   "CheckoutCartao": "aguardando_pagamento",
   "CheckoutPix": "aguardando_pagamento_pix",
}

type PagamentoBotaoProps = {
   formaPagamento: FormasPagamento
}
function PagamentoBotao({ formaPagamento }: PagamentoBotaoProps) {
   const [mostraModal, setMostraModal] = useState(false);

   const { carrinhoId } = useCarrinho();
   const navigate = useNavigation();
   const { setCondigoPagamento } = useCheckout();
   const { token } = useAuth()

   const handleVerificaStatusPagamento = useMutation({
      mutationFn: () => carrinhoStatusPagamento(carrinhoId, token),
      onSuccess(data) {

         if (data.carrinho.status === "comprado") {
            navigate.navigate("IngressosTab");
            return;
         }

         if (data.carrinho.status === "em_compra") {
            if (formaPagamento === "CheckoutCartao") {
               navigate.navigate("CheckoutCartao");
               return;
            }

            handleCheckout.mutate();
            return;
         }

         if (statusPagamento[formaPagamento] !== data.carrinho.status) {
            setMostraModal(true);
            return;
         }

         if (data.carrinho.status === "aguardando_pagamento_pix") {
            handleCheckout.mutate();
            return;
         }

         if (data.carrinho.status === "aguardando_pagamento") {
            navigate.navigate("CheckoutCartao");
            return;
         }
      },
   });

   const handleCheckout = useMutation({
      mutationFn: () => checkout({ tipo_pagamento: "pix" }, carrinhoId),
      onSuccess(data) {
         setCondigoPagamento(data.codigo_pagamento);
         navigate.navigate(formaPagamento)
      }
   });

   const carrinho = handleVerificaStatusPagamento.data;

   return (
      <>

         <CheckoutPagamentoModalPagamentoIniciado
            carrinho={carrinho}
            mostraModal={mostraModal}
            setMostraModal={setMostraModal} />

         <Button
            loading={handleVerificaStatusPagamento.isPending}
            onPress={() => handleVerificaStatusPagamento.mutate()}
            marginHorizontal="md">
            Continuar
         </Button>
      </>
   )
}

export function CheckoutPagamento() {
   const { navigate } = useNavigation();
   const [formaPagamento, setFormaPagamento] = useState<FormasPagamento>('CheckoutCartao');
   const { total, cupom, totalComDesconto, evento, setTaxa, taxa, valorFinal, carrinhoId } = useCarrinho();
   const { statusPagamento } = useCheckout();

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

               <PagamentoBotao formaPagamento={formaPagamento} />

            </Section.Root>
         </VStack>

      </Layout.Root>
   )
}
