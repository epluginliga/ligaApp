
import { Modal, Pressable, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import VStack, { VStackProps } from '../../components/Views/Vstack';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Icon } from '../../icons';

type ModalSmallProps = VStackProps & {
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

type ModalSmallButtonProps = TouchableOpacityProps & {
   openModal: React.ReactNode;
}

export type ModalSmallButtonAction = {
   open: () => void;
   close: () => void;
}
export const ModalSmallButton = forwardRef(({ children, openModal }: ModalSmallButtonProps, ref) => {
   const [mostraModal, setMostraModal] = useState(false)

   useImperativeHandle(ref, () => {
      return {
         open: () => {
            setMostraModal(true)
         },
         close: () => {
            setMostraModal(false)
         },
      }
   }, []);

   return (
      <>
         <TouchableOpacity onPress={() => setMostraModal(true)}>
            {openModal}
         </TouchableOpacity>

         <ModalSmall
            minHeight="25%"
            maxHeight={350}
            ativo={mostraModal}>

            <VStack
               position="absolute"
               top={-16}
               backgroundColor="white"
               variant="shadow"
               p="xs"
               borderRadius={100}
               right={0}>
               <Pressable onPress={() => setMostraModal(false)}>
                  <Icon.X />
               </Pressable>
            </VStack>

            {children}

         </ModalSmall>
      </>
   )
})