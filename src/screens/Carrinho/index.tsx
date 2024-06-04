import React, { useCallback, useState } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

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
import { EventoCarrinhoIngresso } from '../../services/carrinho';
import { Maskara } from '../../utils/Maskara';
import Text from '../../components/Text';

type IngressosAdicionarProps = {
   ingresso: IngressosDisponivelIngressoPayloadProps;
   setPedido: (ingresso: EventoCarrinhoIngresso) => void;
}

function IngressosAdicionar({ ingresso, setPedido }: IngressosAdicionarProps) {
   const [ingressoComprado, setIngressoComprado] = useState<EventoCarrinhoIngresso[]>([]);

   const handleAdd = useCallback((ingressoSelecionado: EventoCarrinhoIngresso) => {
      const ingressoExistente = ingressoComprado
         .find((ingresso) => ingresso.id === ingressoSelecionado.id);

      if (ingressoExistente) {
         ingressoExistente.qtd += 1;
         setIngressoComprado([ingressoExistente]);

      } else {
         setIngressoComprado([...ingressoComprado, ingressoSelecionado]);
      }

   }, [ingressoComprado, setPedido]);

   const handleRemove = useCallback((ingressoSelecionado: EventoCarrinhoIngresso) => {
      const ingressoExistente = ingressoComprado.find((ingresso) => ingresso.id === ingressoSelecionado.id);

      if (ingressoExistente) {
         if (ingressoExistente.qtd === 0) {
            return;
         }
         ingressoExistente.qtd -= 1;
         setIngressoComprado([...ingressoComprado, ingressoExistente]);
      } else {
         ingressoComprado.push(ingressoSelecionado);
         setIngressoComprado(ingressoComprado);
      }
   }, [ingressoComprado]);

   const eventoAtual = ingressoComprado.find(curr => curr.id === ingresso.id);

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
               onPress={() => handleRemove(
                  {
                     id: ingresso.id,
                     lote_id: ingresso.lote_id,
                     qtd: 1
                  })}
            >
               <Icon.Minus />
            </Pressable>

            <Card.Title variant='header'>
               {eventoAtual?.qtd || 0}
            </Card.Title>

            <Pressable
               onPress={() => handleAdd({
                  id: ingresso.id,
                  lote_id: ingresso.lote_id,
                  qtd: 1
               })}
            >
               <Icon.Plus />
            </Pressable>
         </HStack>
      </Card.Root>
   );
}

export function Carrinho() {
   const { navigate } = useNavigation();
   const { evento } = useCarrinho();
   const [pedido, setPedido] = useState<EventoCarrinhoIngresso[]>([]);

   const handleMontaPedido = useCallback((ingresso: EventoCarrinhoIngresso) => {
      setPedido((state) => [...state, ingresso])
   }, []);

   if (!evento) return null;

   const { data, isLoading } = useQuery({
      queryKey: ['fetchIngressoDisponivel', evento?.id,],
      queryFn: () => fetchIngressoDisponivel({ evento_id: evento.id, pontoVenda: vendaAplicativo }),
      enabled: !!evento?.id,
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
                              return <IngressosAdicionar setPedido={handleMontaPedido} key={ingresso.id} ingresso={ingresso} />;
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
               <Button marginHorizontal="md" onPress={() => navigate('CarrinhoUtilizador')}>
                  Continuar
               </Button>
            </VStack>
         </Layout.Root>
      </>
   )
}
