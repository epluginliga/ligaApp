import React, { useContext } from "react";
import { Icon } from "../../../icons";
import VStack from "../../../components/Views/Vstack";
import { StatusBar } from "react-native";
import { StepsContext } from ".";
import { Button } from "../../../components/Button";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";


export function PerfilFotoDescricao() {
   const { step, nextStep } = useContext(StepsContext);

   return (
      <Animated.View
         entering={FadeInRight}
         exiting={FadeOutRight}
         style={[{ flex: 1 }]}
      >
         <VStack flex={1} justifyContent="center" alignItems="center">
            <VStack height={80} width={80} backgroundColor="background_red_tab">
               <VStack height={80} width={80} backgroundColor="primary" borderRadius={100}>
                  <Icon.FaceID color="#fff" />
               </VStack>
            </VStack>

            <Button onPress={() => nextStep()}>Proximo</Button>
         </VStack>
      </Animated.View>
   )
}