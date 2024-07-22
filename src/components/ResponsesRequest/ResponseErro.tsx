import Animated, { FadeInUp, FadeOutDown, FadeOutUp } from "react-native-reanimated";
import { Icon } from "../../icons";
import Text from "../Text";
import VStack from "../Views/Vstack";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ResponseErroProps = {
   erro: string;
   clear: () => void
}
export function ResponseErro({ erro, clear }: ResponseErroProps) {
   const insets = useSafeAreaInsets();

   useEffect(() => {
      if (erro) {
         const time = setTimeout(() => clear(), 4000);
         return () => clearTimeout(time);
      }
   }, [erro]);

   if (!erro) return;

   return (
      <Animated.View
         style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 9999
         }}
         entering={FadeInUp}
         exiting={FadeOutUp}>
         <VStack justifyContent='center' alignItems='center' position='absolute' top={insets.top} zIndex={999} width="100%" >
            <VStack width="100%" gap="sm" maxWidth="95%" backgroundColor='primary' borderRadius={14} alignItems='center' p="sm">
               <Icon.Warning color='#fff' />
               <Text fontSize={14} color='white' textAlign='center'>{erro}</Text>
            </VStack>
         </VStack>
      </Animated.View>
   )
}