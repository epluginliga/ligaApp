import { useState } from "react";
import { Modal, Pressable, TouchableOpacity } from "react-native";
import VStack from "../Views/Vstack";
import HStack from "../Views/Hstack";
import { Icon } from "../../icons";
import Circle from "../Views/Circle";

type ModalApp = {
   children: React.ReactNode;
   handleOpen: React.ReactNode;

}
export function ModalApp({ children, handleOpen }: ModalApp) {
   const [modalVisible, setModalVisible] = useState(false);

   return (
      <>
         <Modal
            presentationStyle="formSheet"
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <VStack
               backgroundColor="white"
               opacity={0.95}
               flex={1}
               position="relative"
               p="md"
            >
               <HStack justifyContent="flex-end">
                  <Pressable
                     onPress={() => setModalVisible(!modalVisible)}>
                     <Circle
                        variant="shadow"
                        width={30}
                        height={30}
                        marginVertical="sm"

                        justifyContent="center"
                     >
                        <Icon.X />
                     </Circle>
                  </Pressable>
               </HStack>

               <VStack m="sm" />

               {children}
            </VStack>
         </Modal>

         <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)}>
            {handleOpen}
         </TouchableOpacity>
      </>
   )
}