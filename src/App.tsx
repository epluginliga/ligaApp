import React from 'react';

import { Routes } from './routes';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme/default';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
