import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from './theme/default';
import { Routes } from './routes';
import { AuthProvider } from './hooks/auth';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

function App(): React.JSX.Element {

  const config = {
    screens: {
      Home: '/',
      PerfilMeuPerfil: 'meu-perfil',
      PerfilAlterarSenha: 'meu-perfil/meu-perfil-senha',
      PerfilMeusEndereco: 'meu-perfil/meu-perfil-endereco',
      // EventosDetalhe: 'evento/:id',
    },
  };

  const linking = {
    prefixes: ['https://www.deualiga.com.br', 'ligaApp://'],
    config
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer linking={linking}>

          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <SafeAreaProvider>
                <Routes />
              </SafeAreaProvider>
            </AuthProvider>
          </QueryClientProvider>

        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
