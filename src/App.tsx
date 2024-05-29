import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from './theme/default';
import { Routes } from './routes';
import { AuthProvider } from './hooks/auth';
import { NavigationContainer } from '@react-navigation/native';
const queryClient = new QueryClient()

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>

          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </QueryClientProvider>

        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
