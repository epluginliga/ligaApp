
import { Modal } from 'react-native';
import VStack, { VStackProps } from '../../components/Views/Vstack';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type ModalSmallProps = VStackProps &{
   children: React.ReactNode;
   ativo: boolean;
}
export const ModalSmall = ({ children, ativo, ...rest }: ModalSmallProps) => (
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
         <VStack backgroundColor='black_opacity'
            flex={1}
            justifyContent='center'
            alignItems='center'>
            <VStack
               backgroundColor='white'
               width="90%"
               p='sm'
               borderRadius={20}
               justifyContent='space-around'
               alignItems='center'
               {...rest}
            >
               {children}
            </VStack>
         </VStack>
      </Animated.View>
   </Modal>
)