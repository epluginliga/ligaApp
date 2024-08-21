import React from "react";
import { ListEmptyComponent } from "../ListEmptyComponent";
import { StyleSheet } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { CameraPermissao } from "./CameraPermissao";


export type CameraProps = {}
export function CameraApp({ }: CameraProps) {
   const device = useCameraDevice('front');
   const { hasPermission } = useCameraPermission();

   if (!hasPermission) return <CameraPermissao />;
   if (device == null) return <ListEmptyComponent title="Acesso á câmera foi negada!" />

   return (
      <Camera
         style={StyleSheet.absoluteFill}
         device={device}
         isActive={true}
      />
   );
}

