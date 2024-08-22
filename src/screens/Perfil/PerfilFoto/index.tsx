import React, { createContext, useCallback, useContext, useState } from 'react';
import { PerfilFotoEnviar } from './PerfilFotoEnviar';
import { PerfilFotoDescricao } from './PerfilFotoDescricao';

type StepsProviderContextProps = {
   step: number;
   backStep: () => void;
   nextStep: () => void;
}
export const StepsContext = createContext<StepsProviderContextProps>({} as StepsProviderContextProps);

const StepsComponents: { [key: number]: React.ReactNode } = {
   0: <PerfilFotoDescricao />,
   1: <PerfilFotoEnviar />,
};

export const PerfilFoto = () => {
   const [step, setStep] = useState(0);
   console.log(step)
   const nextStep = useCallback(() => setStep(step + 1), [step]);
   const backStep = useCallback(() => setStep(step - 1), [step]);

   return (
      <StepsContext.Provider value={{ step, nextStep, backStep }}>
         {StepsComponents[step || 0]}
      </StepsContext.Provider>
   );
};




