import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import WebView from "react-native-webview";
import { RouteApp } from "../../@types/navigation";

type WebProps = RouteProp<RouteApp, 'Web'>;

export const Web = () => {
   const { params } = useRoute<WebProps>();

   return (
      <WebView
         javaScriptCanOpenWindowsAutomatically
         javaScriptEnabled
         source={{ uri: params.uri }}
      />
   )
}