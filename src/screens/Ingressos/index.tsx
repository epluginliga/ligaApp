import React, { Dispatch, createContext, useState } from 'react'
import { TouchableOpacity } from 'react-native';

import { IngressosDisponivel } from './IngressosDisponivel';
import { IngressosComprados } from './IngressosComprados';
import HStack from '../../components/Views/Hstack';
import VStack from '../../components/Views/Vstack';
import Text from '../../components/Text';
import { Layout } from '../../components/Views/Layout';
import { useAuth } from '../../hooks/auth';

import { UsuarioNaoLogado } from '../../components/UsuarioNaoLogado';

type StepsIngressosProps = {
   [key: number]: React.ReactNode
}

const stepsIngressos: StepsIngressosProps = {
   1: <IngressosDisponivel />,
   2: <IngressosComprados />,
};

type TabsProps = {
   setStepAtual: Dispatch<React.SetStateAction<number>>;
   stepAtual: number;
}
function Tabs({ setStepAtual, stepAtual }: TabsProps) {
   return (
      <HStack justifyContent='center' m='md' gap='none' position='absolute' bottom={4} right={0} left={0}>
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
   const { logado } = useAuth();
   const [stepAtual, setStepAtual] = useState(() => 1);

   if (logado) {
      return (
         <>
            {stepsIngressos[stepAtual]}
            <Tabs setStepAtual={setStepAtual} stepAtual={stepAtual} />
         </>
      )
   }

   return (
      <Layout.Root>
         <Layout.Header title='Meus Ingressos' />
         <UsuarioNaoLogado />
      </Layout.Root>
   )
}
