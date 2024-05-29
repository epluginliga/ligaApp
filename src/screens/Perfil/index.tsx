import { useTheme } from '@shopify/restyle'
import React from 'react'
import { View } from 'react-native'
import Text from '../../components/Text';
import { Layout } from '../../components/Views/Layout';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

export function Perfil() {
   const {signOut } = useAuth();

   return (
      <Layout.Root>
         <Section.Root>
            <Section.Title>Sair</Section.Title>
            <Button onPress={signOut }>Sair</Button>
         </Section.Root>
      </Layout.Root>
   )
}
