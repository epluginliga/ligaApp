import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { TabRoute } from './TabRoute';

export function Routes() {
   return (
      <NavigationContainer>
         <TabRoute />
      </NavigationContainer>
   );
}
