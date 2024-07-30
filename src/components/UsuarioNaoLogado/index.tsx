import React from 'react'
import { Image } from 'react-native'
import VStack from '../Views/Vstack'
import { Section } from '../Section'
import { Button } from '../Button'
import { Icon } from '../../icons'
import { useNavigation } from '@react-navigation/native'

export function UsuarioNaoLogado() {
   const { navigate } = useNavigation();

   return (
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
               redirect: "IngressosTab",
            })}
            iconRight={<Icon.User color='#fff' size={20} />}
         >
            Fazer Login
         </Button>
      </VStack>
   )

}
