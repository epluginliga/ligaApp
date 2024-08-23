import React, { useCallback, useRef, useState } from "react";
import { ListEmptyComponent } from "../../../../components/ListEmptyComponent";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission, PhotoFile } from "react-native-vision-camera";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { CameraPermissao } from "./PerfilFotoCameraPermissao";
import VStack, { VStackProps } from "../../../../components/Views/Vstack";
import { Icon } from "../../../../icons";
import Text from "../../../../components/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../../../components/Button";
import { Ovo } from "../../../../icons/ovo";
import { PerfilFotoCameraSucesso } from "./PerfilFotoCameraSucesso";

export type CameraProps = VStackProps & {
   children?: React.ReactNode | React.ReactNode[]
}

export function CameraApp({ children, ...rest }: CameraProps) {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();
   const camera = useRef<Camera>(null);
   const { height } = Dimensions.get("screen");
   const insets = useSafeAreaInsets();
   const [imagem, setImagem] = useState<PhotoFile | null>();

   const handleLimpaFoto = useCallback(() => setImagem(null), []);

   const handleTakePhoto = useCallback(async () => {
      const file = await camera?.current?.takePhoto();
      if (!file) return;

      setImagem({
         ...file,
         path: Platform.OS === "android" ? `file://${file?.path}` : file?.path
      })

   }, []);

   const format = useCameraFormat(device, [
      { photoResolution: { width: 200, height: 200 } }
   ]);

   if (!hasPermission) return <CameraPermissao />;
   if (device == null) return <ListEmptyComponent title="Acesso á câmera foi negada!" />
   if (imagem) return <PerfilFotoCameraSucesso clean={handleLimpaFoto} uri={imagem.path} />

   return (
      <>
         <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            format={format}
            photo={true}
            device={device}
            isActive={true}
         />

         <VStack backgroundColor="white"
            position="absolute"
            top={0}
            width="100%"
            height={0.1853 * height}
         />
         <VStack backgroundColor="white" position="absolute" top={0} right={0} width={52} height={height} />

         <Ovo />

         <View style={{
            position: "absolute",
            bottom: insets.bottom + 6,
            alignSelf: "center",
            justifyContent: "space-between",
         }}>
            <Button
               iconRight={<Icon.FaceID color="#fff" />}
               onPress={handleTakePhoto}>
               Tirar foto
            </Button>

         </View>
      </>
   );
}

