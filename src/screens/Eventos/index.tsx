import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";


export function Eventos() {
   const navigate = useNavigation();

   return (
      <View>
         <Text>Eventos</Text>
         {/* <Button title="SignIn" onPress={() => navigate.navigate("Cadastro")} /> */}
      </View>
   )
}