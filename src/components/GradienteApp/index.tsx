import { useTheme } from "@shopify/restyle";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Theme } from "../../theme/default";
import { StyleProp, ViewStyle } from "react-native";

export type GradienteApp = {
   children: React.ReactNode;
   style?: StyleProp<ViewStyle>;
}

export function GradienteApp({ children, style = {
   flex: 1,
   flexGrow:1
} }: GradienteApp) {
   const { colors } = useTheme<Theme>();

   return (
      <LinearGradient
         colors={[
            colors.primary,
            colors.purple,
            colors.azul,
         ]}
         style={style}
         start={{ x: 1, y: -0.4 }}
         end={{ x: -1.9, y: 0.5 }}>
         {children}
      </LinearGradient>
   )
} 
