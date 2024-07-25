import React from "react"
import VStack from "../Views/Vstack"
import Text from "../Text"
import { StatusPagamento } from "../../hooks/checkout";
import { Icon } from "../../icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/default";
import { Button } from "../Button";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import HStack from "../Views/Hstack";

type PedidoConcluidoCanceladoProps = {
   status: StatusPagamento;
}
export function PedidoConcluidoCancelado({ status }: PedidoConcluidoCanceladoProps) {
   const { colors } = useTheme<Theme>();
   const navigate = useNavigation();

   if (status === "concluido") {
      return (
         <VStack justifyContent="space-evenly" alignItems="center" flex={2}>
            <VStack justifyContent="center" alignItems="center" gap="md">
               <Icon.CheckCircle color={colors.greenDark} size={80} />
               <Text textAlign="center">
                  Esse pedido está com o status: {'\n'}
                  <Text variant="header" color="greenDark">{status}</Text>
               </Text>
               <HStack alignItems="center" justifyContent="center">
                  <Text variant="header2">Redirecionando...</Text>
                  <ActivityIndicator size="small" color={colors.primary} />
               </HStack>
            </VStack>
            <VStack mx="lg">
               <Button
                  onPress={() => navigate.navigate("Ingressos")}
               >
                  Ver meus ingressos
               </Button>
            </VStack>
         </VStack>
      );
   }

   return (
      <VStack justifyContent="space-evenly" alignItems="center" flex={2}>
         <VStack justifyContent="center" alignItems="center" gap="md">
            <Icon.Warning color={colors.warning} size={80} />
            <Text textAlign="center">
               Esse pedido está com o status: {'\n'}
               <Text variant="header" color="warning">{status}</Text>
            </Text>
            <HStack alignItems="center" justifyContent="center">
               <Text variant="header2">Redirecionando...</Text>
               <ActivityIndicator size="small" color={colors.primary} />
            </HStack>

         </VStack>
         <VStack mx="lg">
            <Button
               onPress={() => navigate.navigate("Home")}
               iconRight={false}
               iconLeft={<Icon.ArrowLeftCircle color="#fff" />}>
               Voltar
            </Button>
         </VStack>
      </VStack>
   );
}