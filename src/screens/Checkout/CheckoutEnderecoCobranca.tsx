import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'

import { Layout } from '../../components/Views/Layout'
import VStack from '../../components/Views/Vstack'
import { Section } from '../../components/Section'
import { Icon } from '../../icons'
import { Button } from '../../components/Button'
import { InputText } from '../../components/Inputs/Text'

import { z } from 'zod'

const schemaUtilizador = z.object({
   cep: z.string(),
   logradouro: z.string(),
   numero: z.string(),
   complemento: z.string(),
   bairro: z.string(),
   cidade: z.string(),
   estado: z.string(),
});

type FormEndereco = z.input<typeof schemaUtilizador>;
function FormEndereco() {
   const { navigate } = useNavigation();

   const { control, formState: { errors } } = useForm<FormEndereco>({
      resolver: zodResolver(schemaUtilizador)
   });

   return (

      <VStack gap='md'>
         <Section.Root>

            <InputText
               label='CEP'
               control={control}
               name='cep'
               placeholder='00000-00'
               error={errors?.cep?.message}
            />

            <InputText
               label='Logradouro'
               control={control}
               name='logradouro'
               placeholder='Rua 1...'
               error={errors?.logradouro?.message}
            />

            <InputText
               label='Número'
               control={control}
               name='numero'
               placeholder='Número'
               error={errors?.numero?.message}
            />

            <InputText
               label='Complemento'
               control={control}
               name='complemento'
               error={errors?.complemento?.message}
            />

            <InputText
               label='Cidade'
               control={control}
               name='cidade'
               placeholder='Goiânia'
               error={errors?.cidade?.message}
            />
         </Section.Root>

         <Button onPress={() => navigate('CarrinhoResumo')}
            marginHorizontal="md">
            Continuar
         </Button>

      </VStack>

   )
}

export function CheckoutEnderecoCobranca() {
   return (
      <Layout.Root>

         <Layout.Keyboard>
            <Layout.Header title='Ingressos disponíveis' />

            <Layout.Scroll>
               <VStack gap="sm" m='sm'>
                  <Section.Root>
                     <Section.Title>Endereço de cobrança</Section.Title>

                     <Section.SubTitle iconLeft={<Icon.Pin />}>
                        Seu endereço é necessário para garantir a segurança do pagamento
                     </Section.SubTitle>
                  </Section.Root>

                  <FormEndereco />
               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>
      </Layout.Root>

   )
}
