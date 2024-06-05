import React from 'react';
import { Pressable, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Layout } from '../../components/Views/Layout';
import { Icon } from '../../icons';
import VStack from '../../components/Views/Vstack';

import { Card } from '../../components/Card';
import HStack from '../../components/Views/Hstack';
import { Button } from '../../components/Button';
import { ResumoPedido } from '../../components/ResumoPedido';
import { vendaAplicativo } from '../../utils/constantes';
import { useCarrinho } from '../../hooks/carrinho';
import { IngressosDisponivelIngressoPayloadProps, fetchIngressoDisponivel } from '../../services/eventos';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';
import { Maskara } from '../../utils/Maskara';
import Text from '../../components/Text';
import { CriaEditaCarrinhoProps, criaEditaCarrinho } from '../../services/carrinho';

type IngressosAdicionarProps = {
   ingresso: IngressosDisponivelIngressoPayloadProps;
   eventoId: string;
}

function IngressosAdicionar({ ingresso, eventoId }: IngressosAdicionarProps) {
   const { adicionaIngressoAoEvento, removeIngressoDoEvento, pedido, totalItens } = useCarrinho()

   const quantidade = pedido?.eventos
      .find(item => item.evento_id === eventoId)?.ingressos
      .find(ingr => ingr.id === ingresso.id)?.qtd || 0;

   const desabilitarBotao = ingresso.quantidade_disponivel_ingresso <= 0 ||
      totalItens >= ingresso.quantidade_por_compra ||
      totalItens >= ingresso.quantidade_por_usuario ||
      quantidade >= ingresso.quantidade_disponivel_ingresso ||
      quantidade >= ingresso.quantidade_disponivel_lote;

   return (
      <Card.Root key={ingresso.id} variant='border'>
         <VStack width="100%" maxWidth="30%">
            <Card.Span>
               {ingresso.nome_lote}
            </Card.Span>
            <Card.SubTitle>
               {ingresso.nome}
            </Card.SubTitle>
         </VStack>

         <Card.Title variant='labelInput'>
            {Maskara.dinheiro(+ingresso.valor)}
         </Card.Title>

         <HStack alignItems='center' gap="lg">
            <Pressable
               style={{ opacity: quantidade === 0 ? 0.4 : 1 }}
               disabled={quantidade === 0}
               onPress={() => removeIngressoDoEvento(
                  eventoId,
                  {
                     id: ingresso.id,
                     lote_id: ingresso.lote_id,
                     qtd: 1
                  })}
            >
               <Icon.Minus />
            </Pressable>

            <Card.Title variant='header'>
               {quantidade}
            </Card.Title>

            <Pressable
               style={{ opacity: desabilitarBotao ? 0.4 : 1 }}
               disabled={desabilitarBotao}
               onPress={() => {
                  adicionaIngressoAoEvento(eventoId, {
                     id: ingresso.id,
                     lote_id: ingresso.lote_id,
                     qtd: 1,
                     valor: +ingresso.valor
                  },
                  );
               }}
            >
               <Icon.Plus />
            </Pressable>

         </HStack>
      </Card.Root>
   );
}

export function Carrinho() {
   const { navigate } = useNavigation();
   const { evento, pedido, total, totalItens } = useCarrinho();

   if (!evento) return null;

   const { data, isLoading } = useQuery({
      queryKey: ['fetchIngressoDisponivel', evento?.id,],
      queryFn: () => fetchIngressoDisponivel({ evento_id: evento.id, pontoVenda: vendaAplicativo }),
      enabled: !!evento?.id,
   });

   const handleCriaCarrinho = useMutation({
      mutationKey: ['criaCarrinho'],
      mutationFn: (pedido: CriaEditaCarrinhoProps) => {
         const copyPedido = { ...pedido };
         const newPedido = copyPedido.eventos?.filter(item => item.ingressos.length !== 0)
         return criaEditaCarrinho({ ...pedido, eventos: newPedido });
      },
      onError: (error: Error) => { },
      onSuccess: (data) => {
         console.log(data.mensagem);
         navigate('CarrinhoUtilizador')
      },
   });

   if (!data?.length && !isLoading) {
      return (
         <Layout.Root>
            <Layout.Header title='Ingressos disponíveis' />
            <ResumoPedido />

            <ListEmptyComponent title='Nenhum ingresso disponível!' />
         </Layout.Root>
      )
   };

   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Root>
            <Layout.Header title='Ingressos disponíveis' />

            <Layout.Scroll>
               <VStack gap="lg">

                  <ResumoPedido />

                  {(data ?? []).map?.(data => (
                     <VStack key={data.setor_id}>
                        <Text color='azul' marginHorizontal='sm'>{data.setor_nome}</Text>
                        {data?.ingressos?.map(ingresso => {
                           if (ingresso?.quantidade_disponivel_ingresso > 0) {
                              return (
                                 <IngressosAdicionar
                                    eventoId={evento.id}
                                    key={ingresso.id}
                                    ingresso={ingresso}
                                 />
                              );
                           }

                           return (
                              <Card.Root key={ingresso.id} variant='border'>
                                 <Card.Title>{ingresso.nome}</Card.Title>
                                 <Card.Title variant='labelInput'>
                                    {ingresso.valor}
                                 </Card.Title>
                                 <Card.Title variant='labelInput'>Esgotado</Card.Title>
                              </Card.Root>
                           )
                        })}
                     </VStack>
                  ))}
               </VStack>
            </Layout.Scroll>

            <VStack justifyContent='center' width="100%" bottom={10}>
               <Button
                  disabled={total === 0}
                  iconRight={(
                     <Text variant='header' color='white' verticalAlign='middle'>
                        <Text variant='header3' color='white'>{totalItens} Item por: {' '}</Text>
                        {Maskara.dinheiro(total)}
                     </Text>
                  )}
                  marginHorizontal="md"
                  onPress={() => {
                     if (pedido) {
                        return handleCriaCarrinho.mutate(pedido);
                     }

                     return;
                  }}
               >
                  <Text color='white'>
                     Continuar
                  </Text>
               </Button>
            </VStack>
         </Layout.Root>
      </>
   )
}
