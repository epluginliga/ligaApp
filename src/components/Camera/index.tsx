import React from "react";
import { ListEmptyComponent } from "../ListEmptyComponent";
import { StyleSheet } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { CameraPermissao } from "./CameraPermissao";
import VStack, { VStackProps } from "../Views/Vstack";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";


export type CameraProps = VStackProps & {
   children?: React.ReactNode | React.ReactNode[]
}

export function CameraApp({ children, ...rest }: CameraProps) {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();

   if (!hasPermission) return <CameraPermissao />;
   if (device == null) return <ListEmptyComponent title="Acesso á câmera foi negada!" />

   return (
      <VStack {...rest}>
         <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
         />
         {children && children}
      </VStack>
   );
}

