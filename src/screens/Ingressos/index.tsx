import React, { createContext, useState } from 'react'
import { IngressosDisponivel } from './IngressosDisponivel';
import { IngressosComprados } from './IngressosComprados';

type StepsIngressosProps = {
   [key: number]: React.ReactNode
}

type StepsIngressosContext = {
   next: any;
   prev: any;
}

export const StepContext = createContext<StepsIngressosContext>({} as StepsIngressosContext);

const stepsIngressos: StepsIngressosProps = {
   1: <IngressosComprados />,
   2: <IngressosDisponivel />,
};

export function Ingressos() {
   const [stepAtual, setStepAtual] = useState(() => 1);

   return (
      <StepContext.Provider value={{
         next: () => setStepAtual((state) => state += 1),
         prev: () => setStepAtual((state) => state -= 1),
      }}>
         {stepsIngressos[stepAtual]}
      </StepContext.Provider>
   )
}
