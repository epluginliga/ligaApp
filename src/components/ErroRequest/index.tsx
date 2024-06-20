import Animated,{ FadeInUp,FadeOutDown,FadeOutUp } from "react-native-reanimated";
import { Icon } from "../../icons";
import Text from "../Text";
import VStack from "../Views/Vstack";
import { useEffect,useState } from "react";

type ErroRequestProps = {
   erro: string;
   clear: () => void
}
export function ErroRequest({ erro , clear}: ErroRequestProps) {
   const [mostrar,setMostrar] = useState(() => !!erro);

   useEffect(() => {
      if (erro) {
         const time = setTimeout(() => clear(),4000);
         return () => clearTimeout(time);
      } 
   },[erro]);

   if (!mostrar) return;

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
         <VStack justifyContent='center' alignItems='center' position='absolute' top={10} zIndex={999} width="100%" >
            <VStack width="100%" gap="sm" maxWidth="95%" backgroundColor='botao_default' borderRadius={14} alignItems='center' p="sm">
               <Icon.Warning color='#fff' />
               <Text fontSize={14} color='white' textAlign='center'>{erro}</Text>
            </VStack>
         </VStack>
      </Animated.View>
   )
}