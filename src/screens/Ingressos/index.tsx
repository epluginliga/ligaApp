import React, { Dispatch, createContext, useState } from 'react'
import { IngressosDisponivel } from './IngressosDisponivel';
import { IngressosComprados } from './IngressosComprados';
import HStack from '../../components/Views/Hstack';
import { TouchableOpacity } from 'react-native';
import VStack from '../../components/Views/Vstack';
import Text from '../../components/Text';
import { Layout } from '../../components/Views/Layout';

type StepsIngressosProps = {
   [key: number]: React.ReactNode
}
type StepsIngressosContext = {}

export const StepContext = createContext<StepsIngressosContext>({} as StepsIngressosContext);

const stepsIngressos: StepsIngressosProps = {
   1: <IngressosDisponivel />,
   2: <IngressosComprados />,
};

type HeaderProps = {
   setStepAtual: Dispatch<React.SetStateAction<number>>;
   stepAtual: number;
}
function Tabs({ setStepAtual, stepAtual }: HeaderProps) {
   return (
      <HStack justifyContent='center' m='md' gap='none'>
         <TouchableOpacity
            onPress={() => setStepAtual(1)}
            activeOpacity={0.7}>
            <VStack
               paddingVertical="sm"
               paddingHorizontal='lg'
               borderTopStartRadius={12}
               borderBottomStartRadius={12}
               backgroundColor={stepAtual === 1 ? 'buttonPrimaryBackground' : 'botao_default'}>
               <Text color='white' variant='header3'>Próximos eventos</Text>
            </VStack>
         </TouchableOpacity>

         <TouchableOpacity
            onPress={() => setStepAtual(2)}
            activeOpacity={0.7}>
            <VStack
               paddingVertical="sm"
               paddingHorizontal='lg'
               borderTopEndRadius={12}
               borderBottomEndRadius={12}
               backgroundColor={stepAtual === 2 ? 'buttonPrimaryBackground' : 'botao_default'}>
               <Text color='white' variant='header3'>Eventos passados</Text>
            </VStack>
         </TouchableOpacity>
      </HStack>
   )
}

export function Ingressos() {
   const [stepAtual, setStepAtual] = useState(() => 1);

   return (
      <StepContext.Provider value={{}}>
         <Layout.Root>


            {stepsIngressos[stepAtual]}

            <Tabs setStepAtual={setStepAtual} stepAtual={stepAtual} />

         </Layout.Root>
      </StepContext.Provider>
   )
}
