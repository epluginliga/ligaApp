import React from 'react';

import { CheckoutProvider } from './checkout'
import { CarrinhoProvider } from './carrinho';

interface AppProviderProps {
   children: React.ReactNode;
}
const AppProvider = ({ children }: AppProviderProps) => {
   return (
      <CarrinhoProvider>
         <CheckoutProvider>
            {children}
         </CheckoutProvider>
      </CarrinhoProvider>
   )
};

export default AppProvider;
