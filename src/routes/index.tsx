import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { TabRoute } from './TabRoute';
import { View } from 'react-native';

export function Routes() {
   return (
      <NavigationContainer>
         <View style={{ backgroundColor: "#ebebeb", flex: 1 }}>
            <TabRoute />
         </View>
      </NavigationContainer>
   );
}
