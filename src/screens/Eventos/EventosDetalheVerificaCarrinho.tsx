import { useState } from "react";
import { EventosPayload } from "../../services/@eventos";
import { useAuth } from "../../hooks/auth";

import { useNavigation } from "@react-navigation/native";
import { useCheckout } from "../../hooks/checkout";
import { deletaCarrinho, obtemCarrinho } from "../../services/carrinho";
import { useMutation } from "@tanstack/react-query";
import { ModalSmall } from "../../components/Modal/ModalSmall";
import VStack from "../../components/Views/Vstack";
import Text from "../../components/Text";
import HStack from "../../components/Views/Hstack";
import { Platform, Pressable } from "react-native";
import { Icon } from "../../icons";
import { useCarrinho } from "../../hooks/carrinho";
import { Button } from "../../components/Button";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/default";
import { IngressoCarrinho, PayloadCarrinho } from "../../services/@carrinho";


function verificaSeCarrinhoTemUtilizador(ingresso: IngressoCarrinho[]): "CarrinhoResumo" | null {
   const Temutilizadores = ingresso.filter(usuario => usuario.dados_atribuir.length > 0)
      .map(item => item.dados_atribuir)
      .map(item => item.filter(user => user.cpf && user.nome))
      .filter(item => item.length > 0);

   if (Temutilizadores.length > 0) {
      return "CarrinhoResumo";
   }

   return null;
}

type ButtonComprarInfressosProps = {
   evento: EventosPayload
}
export function ButtonComprarIngressos({ evento }: ButtonComprarInfressosProps) {
   const [mostraModal, setMostraModal] = useState(false);
   const { logado } = useAuth();
   const { adicionaEvento, limpaCarrinho, setCupom, setCarrinhoId, total, adicionaIngressoAoEvento } = useCarrinho();
   const { navigate } = useNavigation();
   const { updateStatus } = useCheckout();
   const { colors } = useTheme<Theme>()

   function limpaCarrinhoLocal() {
      limpaCarrinho();
      adicionaEvento(evento);
      setCarrinhoId('')
      navigate('Carrinho');
      updateStatus("");
   }

   function atualizaIngressoAoEvento(ingresso: IngressoCarrinho[]) {
      if (total === 0) {
         ingresso.forEach(ingr => {
            adicionaIngressoAoEvento({
               id: ingr.id,
               lote_id: ingr.lote_id,
               qtd: ingr.qtd,
               valor: ingr.valor
            })
         })
      }
   }

   function emCompra(data: PayloadCarrinho) {
      if (data.cupom) {
         setCupom(data.cupom)
      }

      const eventoCarrinho = data.eventos?.[0];
      adicionaEvento({
         nome_local: eventoCarrinho.nome_local,
         data_evento: eventoCarrinho.data_evento,
         id: eventoCarrinho.id,
         path_imagem: eventoCarrinho.path_imagem,
         nome: eventoCarrinho.nome,
         taxas: JSON.stringify(eventoCarrinho?.taxas),
         quantidade_parcelas: data?.parcelas_permitidas,
      });
      setMostraModal(true);
   }

   const handleVerificaSeExisteCarrinho = useMutation({
      mutationFn: obtemCarrinho,
      mutationKey: ['EventoDetalheObtemCarrinho'],
      onSuccess(data) {
         setCarrinhoId(data.id);
         switch (data.status) {
            case "aguardando_pagamento_pix":
               setMostraModal(true);
               break;
            case "em_compra":
               emCompra(data);
               break;
            default: {
               adicionaEvento(evento)
               navigate("Carrinho");
               break;
            }
         }
      },
      onError: () => limpaCarrinhoLocal(),
   });

   const cancelaCarrinho = useMutation({
      mutationFn: deletaCarrinho,
      onSuccess() {
         limpaCarrinho();
         adicionaEvento(evento);
         navigate('Carrinho');
      },
   });

   const { data: carrinho } = handleVerificaSeExisteCarrinho;

   return (
      <>
         <ModalSmall
            minHeight="25%"
            maxHeight={250}
            ativo={mostraModal}>
            {carrinho && (
               <VStack gap='xl' >
                  <Text textAlign='center' color='azul'>
                     Você já tem um carrinho
                     <Text variant='header' >{'\n'} {carrinho?.status_str}</Text>
                  </Text>

                  <VStack gap="md">
                     <Text textAlign='center' variant='header2'>O que Deseja fazer?</Text>

                     <HStack width="100%" paddingHorizontal='md' justifyContent='space-between'>
                        <Pressable onPress={() => {
                           setMostraModal(false);
                           cancelaCarrinho.mutate(carrinho.id);
                        }}>
                           <HStack alignItems='center' backgroundColor='white' p='sm' borderRadius={10}>
                              <Text variant='botaoLink' color='primary'>Limpar, e continuar</Text>
                           </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                           setMostraModal(false);

                           if (carrinho.status === "aguardando_pagamento_pix") {
                              return navigate("CheckoutPix");
                           }

                           const ingresso = carrinho.eventos.flatMap(ingresso => ingresso.ingressos);

                           atualizaIngressoAoEvento(ingresso);
                           const rota = verificaSeCarrinhoTemUtilizador(ingresso);

                           return navigate(rota || "CarrinhoUtilizador");
                        }}>
                           <HStack alignItems='center' backgroundColor='white' p='sm' borderRadius={10}>
                              <Text variant='botaoLink' color='greenDark'>Continuar</Text>
                              <Icon.ArrowRight size={18} color={colors.greenDark} />
                           </HStack>
                        </Pressable>
                     </HStack>
                  </VStack>
               </VStack>
            )}
         </ModalSmall >

         <VStack
            position="absolute"
            justifyContent='center'
            width="100%"
            bottom={Platform.OS === "android" ? 10 : 30}
         >
            <Button
               loading={handleVerificaSeExisteCarrinho.isPending}
               marginHorizontal="md"
               onPress={() => {
                  if (logado) {
                     updateStatus("");
                     handleVerificaSeExisteCarrinho.mutate();
                     return;
                  }

                  adicionaEvento(evento);
                  return navigate("Login", {
                     redirect: "Carrinho",
                  });
               }}>
               Comprar
            </Button>
         </VStack>
      </>
   )
}
