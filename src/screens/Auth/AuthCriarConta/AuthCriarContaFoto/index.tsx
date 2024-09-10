import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from "react-native-vision-camera";

import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useTheme } from "@shopify/restyle";
import Animated, { FadeIn, FadeOutRight } from "react-native-reanimated";
import { Theme } from "../../../../theme/default";
import { ListEmptyComponent } from "../../../../components/ListEmptyComponent";
import VStack from "../../../../components/Views/Vstack";
import { Ovo } from "../../../../icons/ovo";
import { Button } from "../../../../components/Button";
import { Icon } from "../../../../icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthCriarContaFotoCameraPermissao } from "./AuthCriarContaFotoCameraPermissao";
import { AuthCriarContaFotoSucesso } from "./AuthCriarContaFotoCameraSucesso";

type AuthCriarContaFotoProps = {
   setValue: any
}
export function AuthCriarContaFoto({ ...rest }: AuthCriarContaFotoProps) {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();
   const camera = useRef<Camera>(null);
   const { colors } = useTheme<Theme>();
   const [fotoSucesso, setFotoSucesso] = useState<Image>();

   const { height, width } = Dimensions.get("screen");
   const insets = useSafeAreaInsets();

   const handleTakePhoto = useCallback(async () => {
      const file = await camera?.current?.takePhoto();

      if (!file) return;

      let newFile = {
         ...file,
         path: Platform.OS === "android" ? `file://${file?.path}` : file?.path,
      };

      ImagePicker.openCropper({
         path: newFile.path,
         width: 200,
         height: 200,
         mediaType: "photo",
         enableRotationGesture: true,
         cropperChooseText: "Selecionar",
         cropperCancelText: "Cancelar",
         cropperChooseColor: colors.greenDark
      }).then(image => setFotoSucesso(image));
   }, []);

   const format = useCameraFormat(device, [
      {
         photoResolution: {
            width: 400,
            height: 400,
         },
      }
   ]);

   if (fotoSucesso) return <AuthCriarContaFotoSucesso {...rest} {...fotoSucesso} />
   if (!hasPermission) return <AuthCriarContaFotoCameraPermissao />
   if (device == null) return <ListEmptyComponent title="Acesso á câmera foi negada!" />

   return (
      <VStack flex={1} backgroundColor="white">
         <Animated.View
            entering={FadeIn}
            exiting={FadeOutRight}
            style={[{
               position: "relative",
               width,
               justifyContent: "center",
               backgroundColor: "#fff"
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
               resizeMode="cover"
               outputOrientation="preview"
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
            bottom: insets.bottom + 26,
            alignSelf: "center",
            justifyContent: "space-between",
         }}>
            <Button
               iconRight={<Icon.FaceID color="#fff" />}
               onPress={handleTakePhoto}>
               Tirar foto
            </Button>
         </View>
      </VStack>
   );
}

