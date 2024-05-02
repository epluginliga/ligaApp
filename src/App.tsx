import React from 'react';

import { Routes } from './routes';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme/default';
import { StatusBarApp } from './components/Text/StatusBarApp';
import { StatusBar } from 'react-native';

function App(): React.JSX.Element {

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ThemeProvider theme={theme}>
        <StatusBarApp />

        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
