import React from 'react';

import { Routes } from './routes';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme/default';
import { StatusBarApp } from './components/StatusBarApp';

function App(): React.JSX.Element {

  return (
    <ThemeProvider theme={theme}>
      <StatusBarApp />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
