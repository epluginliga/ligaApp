import React from 'react';

import { Routes } from './routes';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme/default';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
