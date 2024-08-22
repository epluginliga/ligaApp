import React, { useContext } from "react";
import { Icon } from "../../../icons";
import VStack, { VStackProps } from "../../../components/Views/Vstack";
import { StepsContext } from ".";
import { Button } from "../../../components/Button";
import Animated, { Easing, FadeIn, FadeInRight, FadeOutRight } from "react-native-reanimated";
import Text from "../../../components/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

type BordasProps = VStackProps & {
   children: React.ReactNode;
   size: number;
   delay: number;
}

function Bordas({ children, size, delay, ...rest }: BordasProps) {
   
   return (
      <Animated.View
         entering={FadeIn.delay(delay).easing(Easing.linear)}
         exiting={FadeOutRight.delay(delay)}
      >
         <VStack
            height={size}
            width={size}
            alignItems="center"
            justifyContent="center"
            borderRadius={300}
            {...rest}>
            {children}
         </VStack>
      </Animated.View>
   )
}

export function PerfilFotoDescricao() {
   const { step, nextStep } = useContext(StepsContext);
   const insets = useSafeAreaInsets();

   return (
      <Animated.View
         entering={FadeInRight}
         exiting={FadeOutRight}
         style={[{ flex: 1 }]}
      >
         <VStack p="sm" flex={1} justifyContent="center" gap="xl" alignItems="center">
            <VStack flex={1} justifyContent="center" gap="xl" alignItems="center">
               <Text variant="header" fontSize={15} textAlign="center">
                  Faça o seu reconhecimento para ter acesso aos eventos com mais Segurança
               </Text>

               <Bordas size={350} delay={500} backgroundColor="vermelho_200">
                  <Bordas size={250} delay={600} backgroundColor="vermelho_300">
                     <Bordas size={175} delay={700} backgroundColor="vermelho_500">
                        <Icon.FaceID size={40} color="#fff" />
                     </Bordas>
                  </Bordas>
               </Bordas>
            </VStack>

            <View style={{
               marginBottom: insets.bottom + 6
            }}>
               <Button onPress={() => nextStep()}>Proximo</Button>
            </View>
         </VStack>
      </Animated.View >
   )
}