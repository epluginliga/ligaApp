import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from './screens/SignIn';
import { Eventos } from './screens/Eventos';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (

    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <Stack.Navigator initialRouteName="Eventos">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen options={{
            headerShown: false,
          }}
            name="Eventos" component={Eventos} />
        </Stack.Navigator>
      </SafeAreaView>



    </NavigationContainer>


  );
}

export default App;
