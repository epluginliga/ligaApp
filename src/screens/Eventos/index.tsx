import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Text from "../../components/Text";


export function Eventos() {
   const navigate = useNavigation();

   return (
      <View>
         <Text variant="header" color="black">Eventos</Text>
         {/* <Button title="SignIn" onPress={() => navigate.navigate("Cadastro")} /> */}
      </View>
   )
}