import { useNavigation } from "@react-navigation/native";
import { CarrinhoStatusPagamentoPayload, deletaCarrinho } from "../../services/carrinho";
import { useCarrinho } from "../../hooks/carrinho";
import { useMutation } from "@tanstack/react-query";
import { ModalSmall } from "../../components/Modal/ModalSmall";
import VStack from "../../components/Views/Vstack";
import Text from "../../components/Text";
import HStack from "../../components/Views/Hstack";
import { ActivityIndicator, Pressable } from "react-native";
import { Icon } from "../../icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/default";
import { useEffect } from "react";

type CheckoutPagamentoModalPagamentoIniciadoProps = {
   mostraModal: boolean;
   carrinho?: CarrinhoStatusPagamentoPayload;
   setMostraModal: (value: boolean) => void;
}
const rotaPagamento: { [key: string]: "CheckoutCartao" | "CheckoutPix" } = {
   "aguardando_pagamento": "CheckoutCartao",
   "aguardando_pagamento_pix": "CheckoutPix"
}

export function CheckoutPagamentoModalPagamentoIniciado({ mostraModal, carrinho, setMostraModal }: CheckoutPagamentoModalPagamentoIniciadoProps) {
   const { limpaCarrinho, carrinhoId } = useCarrinho()
   const { navigate } = useNavigation();
   const { colors } = useTheme<Theme>()

   const handleCancelaCarrinho = useMutation({
      mutationFn: deletaCarrinho,
      onSuccess() {
         limpaCarrinho();
         setMostraModal(false);
         navigate('Eventos');
      }, onError(error) {
         console.log(JSON.stringify(error, null, 1));
      },
   });

   useEffect(() => {
      if (handleCancelaCarrinho.isError) {
         const time = setTimeout(() => {
            handleCancelaCarrinho.reset();
            setMostraModal(false);
         }, 3000);

         return () => clearTimeout(time);
      }
   }, [handleCancelaCarrinho]);

   if (!carrinho) return;

   return (
      <ModalSmall
         minHeight="25%"
         maxHeight={350}
         ativo={mostraModal}>
         {carrinho && (
            <VStack gap='xl' position="relative">
               <Pressable onPress={() => setMostraModal(false)}>
                  <VStack
                     position="absolute"
                     top={-25}
                     backgroundColor="white"
                     variant="shadow"
                     p="xs"
                     borderRadius={100}
                     right={0}>
                     <Icon.X />
                  </VStack>
               </Pressable>
               {handleCancelaCarrinho.error ? (
                  <VStack justifyContent="center" alignItems="center" gap="md">
                     <Icon.Warning size={30} />
                     <Text textAlign="center" variant="header2">
                        Ainda estamos processando o pagamento. Tente novamente em alguns instantes!
                     </Text>
                     <ActivityIndicator />
                  </VStack>
               ) : (
                  <>
                     <VStack>
                        <Text textAlign='center' variant='header2'>
                           Seu pedido esta com status:
                        </Text>
                        <Text textAlign='center' variant='header' color="azul">
                           {carrinho.carrinho?.status_str}
                        </Text>
                     </VStack>
                     <VStack gap="md">
                        <Text textAlign='center' variant='header2'>O que Deseja fazer?</Text>

                        <HStack width="100%" paddingHorizontal='md' justifyContent='space-between'>
                           <Pressable onPress={() => handleCancelaCarrinho.mutate(carrinhoId)}>
                              <HStack alignItems='center' backgroundColor='bege' p='sm' borderRadius={10}>
                                 {handleCancelaCarrinho.isPending ? (
                                    <ActivityIndicator size="small" color={colors.primary} />
                                 ) : (
                                    <>
                                       <Icon.Trash size={14} color={colors.primary} />
                                       <Text variant='botaoLink' color='primary'>Excluir pedido</Text>
                                    </>
                                 )}
                              </HStack>
                           </Pressable>

                           <Pressable onPress={() => {
                              setMostraModal(false);
                              navigate(rotaPagamento[carrinho.carrinho.status]);
                           }}>
                              <HStack alignItems='center' backgroundColor='bege' p='sm' borderRadius={10}>
                                 <Text variant='botaoLink' color='greenDark'>Continuar</Text>
                                 <Icon.ArrowRight size={18} color={colors.greenDark} />
                              </HStack>
                           </Pressable>
                        </HStack>
                     </VStack>
                  </>
               )}
            </VStack>
         )}
      </ModalSmall>
   )
}