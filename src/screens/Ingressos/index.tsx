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
import { useQuery } from '@tanstack/react-query';
import { fetchIngressoComprado } from '../../services/eventos';
import { formataData } from '../../utils/utils';
import { IngressosPayload } from '../../services/@eventos';

type StepsIngressosProps = {
   [key: number]: React.ReactNode
}
type StepsIngressosContext = {
   proximoEventos?: IngressosPayload[];
   eventosPassados?: IngressosPayload[];
}
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
   const { logado } = useAuth();
   const [stepAtual, setStepAtual] = useState(() => 1);

   if (logado) {

      const { data } = useQuery({
         queryKey: ['ingressosComprados'],
         queryFn: fetchIngressoComprado,
      });

      if (!data) return null;

      const proximoEventos = data?.data?.filter(eventos => {
         const dataEvento = formataData();
         const novaData = dataEvento.converteDataBRtoISO(eventos.evento_data_evento);
         return new Date <= new Date(novaData);
      });

      const eventosPassados = data?.data?.filter(eventos => {
         const dataEvento = formataData();
         const novaData = dataEvento.converteDataBRtoISO(eventos.evento_data_evento);
         return new Date > new Date(novaData);
      });

      return (
         <StepContext.Provider value={{
            eventosPassados,
            proximoEventos
         }}>
            {stepsIngressos[stepAtual]}
            <Tabs setStepAtual={setStepAtual} stepAtual={stepAtual} />
         </StepContext.Provider>
      )
   }

   return (
      <Layout.Root>
         <Layout.Header title='Meus Ingressos' />
         <UsuarioNaoLogado />
      </Layout.Root>
   )
}
