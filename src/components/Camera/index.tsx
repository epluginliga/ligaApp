import React, { useCallback, useRef } from "react";
import { ListEmptyComponent } from "../ListEmptyComponent";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from "react-native-vision-camera";
import { CameraPermissao } from "./CameraPermissao";
import VStack, { VStackProps } from "../Views/Vstack";
import { Button } from "../Button";
import Text from "../Text";
import { Ovo } from "../../icons/ovo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../icons";

export type CameraProps = VStackProps & {
   children?: React.ReactNode | React.ReactNode[]
}

export function CameraApp({ children, ...rest }: CameraProps) {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();
   const camera = useRef<Camera>(null);
   const { width, height } = Dimensions.get("screen");
   const insets = useSafeAreaInsets();

   const handleTakePhoto = useCallback(async () => {
      const photo = await camera?.current?.takePhoto();
      console.log(JSON.stringify(photo, null, 1))
   }, []);

   const format = useCameraFormat(device, [
      { photoResolution: { width: 200, height: 200 } }
   ]);

   if (!hasPermission) return <CameraPermissao />;
   if (device == null) return <ListEmptyComponent title="Acesso á câmera foi negada!" />

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
            height={0.1 * height}
         />
         <VStack backgroundColor="white" position="absolute" bottom={0} width="100%" height={0.2 * height} />

         <Ovo />

         <View style={{ position: "absolute", bottom: insets.bottom + 6, alignSelf: "center" }}>
            <Button
               iconRight={<Icon.FaceID color="#fff" />}
               onPress={handleTakePhoto}>
               Tirar foto
            </Button>

         </View>
      </>
   );
}

