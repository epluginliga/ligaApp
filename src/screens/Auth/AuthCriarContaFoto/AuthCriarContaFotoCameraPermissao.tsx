import React, { useState } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';
import { Image, PressableProps } from "react-native";
import VStack from '../../../components/Views/Vstack';
import Text from '../../../components/Text';
import { Button } from '../../../components/Button';
import { Icon } from '../../../icons';

export type ICameraPermision = {
   text?: string;
   action?: PressableProps;
   children?: React.ReactNode;
};
function SolicitaPermissaoCamera({
   text = 'Não foi possível acessar a câmera!',
   children
}: ICameraPermision) {
   return (
      <VStack
         justifyContent="space-around"
         gap='md'
         backgroundColor='white'
         padding='sm'
         flex={1}>

         <VStack gap='xl'>
            <Image
               style={{
                  width: 250,
                  height: 250,
                  borderRadius: 50,
                  marginHorizontal: "auto"
               }}
               alt="Permission camera image"
               source={require('../../../../assets/imagem/permission_camera.png')}
            />

            <Text textAlign="center">
               {text}
            </Text>
         </VStack>

         {children ? children : (
            <Button iconRight={false} iconLeft={<Icon.ArrowLeft color='#fff' />}>
               Voltar
            </Button>
         )}

      </VStack>

   );
}

const msgs: { [key: number]: string } = {
   0: "Precisamos da sua permissão pra acessar a câmera!",
   1: `Não foi possível acessar a câmera! \n Verifique as configurações do aplicativo!`
}
export const AuthCriarContaFotoCameraPermissao = () => {
   const { requestPermission } = useCameraPermission();
   const [permissaoMensagem, setPermissaoMensagem] = useState(0);

   return (
      <SolicitaPermissaoCamera text={msgs[permissaoMensagem]}>
         {permissaoMensagem === 0 ? (
            <Button onPress={async () => {
               try {
                  const resp = await requestPermission();
                  if (!resp) {
                     setPermissaoMensagem(1);
                  }
               } catch (error: any) {
                  console.log(JSON.stringify(error, null, 1))
               }
            }} >
               Abrir câmera
            </Button>
         ) : (
            <Button>Voltar</Button>
         )}
      </SolicitaPermissaoCamera>
   );
}

