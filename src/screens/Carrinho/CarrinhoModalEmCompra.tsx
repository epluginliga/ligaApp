
import { Modal } from 'react-native';
import VStack from '../../components/Views/Vstack';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type CarrinhoModalEmCompraProps = {
   children: React.ReactNode;
   ativo: boolean;
}
export const CarrinhoModalEmCompra = ({ children, ativo }: CarrinhoModalEmCompraProps) => (
   <Modal
      animationType="slide"
      transparent={true}
      visible={ativo}
   >
      <Animated.View
         entering={FadeIn}
         exiting={FadeOut}
         style={[{ flex: 1 }]}
      >
         <VStack backgroundColor='black_opacity' flex={1} justifyContent='center' alignItems='center'>
            <VStack backgroundColor='white' p='sm' m='md' width="90%" maxWidth={380} height="40%" maxHeight={250} borderRadius={20} justifyContent='space-around' alignItems='center'>
               {children}
            </VStack>
         </VStack>
      </Animated.View>
   </Modal>
)