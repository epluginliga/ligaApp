import React, { Dispatch, createContext, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IngressosDisponivel } from './IngressosDisponivel';
import { IngressosComprados } from './IngressosComprados';
import HStack from '../../components/Views/Hstack';
import VStack from '../../components/Views/Vstack';
import Text from '../../components/Text';
import { Layout } from '../../components/Views/Layout';
import { useAuth } from '../../hooks/auth';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Icon } from '../../icons';

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
   const { logado } = useAuth();
   const { navigate } = useNavigation();

   if (logado) {
      return (
         <>
            {stepsIngressos[stepAtual]}
            <Tabs setStepAtual={setStepAtual} stepAtual={stepAtual} />
         </>
      )
   }

   return (
      <>
         <Layout.Header title='Meus Ingressos' backgroundColor='white' />

         <VStack gap='lg' flex={1} justifyContent='center' alignItems='center'>

            <Section.Root alignItems='center'>
               <Image
                  resizeMode='cover'
                  fadeDuration={2}
                  style={{ width: 150, height: 50 }}
                  source={require("../../../assets/imagem/logo.png")}
               />

               <Section.Title>Você está desconectado</Section.Title>
               <Section.SubTitle>Faça o login, para acessar todas as novidades</Section.SubTitle>

            </Section.Root>

            <Button
               onPress={() => navigate("Login", {
                  redirect: "IngressosTab"
               })}
               iconRight={<Icon.User color='#fff' size={20} />}
            >
               Fazer Login
            </Button>
         </VStack>
      </>
   )
}
