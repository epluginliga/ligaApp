import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission, PhotoFile } from "react-native-vision-camera";
import { CameraPermissao } from "./PerfilFotoCameraPermissao";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ListEmptyComponent } from "../../../../components/ListEmptyComponent";
import VStack from "../../../../components/Views/Vstack";
import { Button } from "../../../../components/Button";
import { Icon } from "../../../../icons";
import { Ovo } from "../../../../icons/ovo";
import { PerfilFotoCameraSucesso } from "./PerfilFotoCameraSucesso";
import { imagemApp } from "../../../../utils/utils";

export function CameraApp() {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();
   const camera = useRef<Camera>(null);
   const [imagem, setImagem] = useState<PhotoFile | null>();

   const { height } = Dimensions.get("screen");
   const insets = useSafeAreaInsets();

   const handleLimpaFoto = useCallback(() => setImagem(null), []);

   const handleTakePhoto = useCallback(async () => {
      const file = await camera?.current?.takePhoto();

      if (!file) return;

      const newFile = {
         ...file,
         path: Platform.OS === "android" ? `file://${file?.path}` : file?.path,
      };

      let base64Image = await imagemApp(newFile.path).base64File();

      const jsonData = {
         path_camera_web: false,
         path_avatar_camera: base64Image,
         tipo_imagem_camera: "image/jpg"
      };

      setImagem(newFile);
   }, []);

   const format = useCameraFormat(device, [
      {
         photoResolution: {
            width: 200,
            height: 200,
         },

      }
   ]);

   if (!hasPermission) return <CameraPermissao />
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

