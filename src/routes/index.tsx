import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { TabRoute } from './TabRoute';

export function Routes() {
   return (
      <NavigationContainer>
         <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <TabRoute />
         </View>
      </NavigationContainer>
   );
}
