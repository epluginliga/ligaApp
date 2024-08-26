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
import Animated, { FadeIn, FadeOutRight } from "react-native-reanimated";

export function PerfilFotoCamera() {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();
   const camera = useRef<Camera>(null);
   const [imagem, setImagem] = useState<PhotoFile | null>();

   const { height, width } = Dimensions.get("screen");
   const insets = useSafeAreaInsets();

   const handleLimpaFoto = useCallback(() => setImagem(null), []);

   const handleTakePhoto = useCallback(async () => {
      const file = await camera?.current?.takePhoto();

      if (!file) return;

      const newFile = {
         ...file,
         path: Platform.OS === "android" ? `file://${file?.path}` : file?.path,
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
         <Animated.View
            entering={FadeIn}
            exiting={FadeOutRight}
            style={[{
               position: "relative",
               width,
               justifyContent: "center"
            }]}
         >
            <Camera
               ref={camera}
               style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
               }}
               format={format}
               photo={true}
               device={device}
               isActive={true}
               isMirrored={false}
            />

            <VStack backgroundColor="white"
               position="absolute"
               top={0}
               width="100%"
               height={0.1853 * height}
            />

            <Ovo />

         </Animated.View>

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

