import React, { useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import VStack from '../../components/Views/Vstack'
import { InputText } from '../../components/Inputs/Text'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { ResumoPedido } from '../../components/ResumoPedido'
import { obtemCarrinho } from '../../services/carrinho'
import { IngressoCarrinho } from '../../services/@carrinho'
import { CarrinhoUtilizadorAtletica } from './CarrinhoUtilizadorAtletica'
import HStack from '../../components/Views/Hstack'
import Circle from '../../components/Views/Circle'
import Text from '../../components/Text'

type FormUtilizadorProps = {
   control: any,
   errors?: FieldErrors<FormUtilizador>;
   evento_key: number;
   ingresso_key: number;
   ingresso: IngressoCarrinho;
}

const schemaUtilizador = z.object({
   lotes: z.array(
      z.object({
         id: z.string().optional(),
         evento_ingresso_id: z.string().optional(),
         donos: z.array(
            z.object({
               usuario_proprio: z.boolean().optional(),
               dono_ingresso: z.object({
                  nome: z.string(),
                  email: z.string().email({
                     message: "E-mail inválido!"
                  }),
               })
            })
         ),
      })
   ),
   atletica_slug: z.string().optional(),
});

export type FormUtilizador = z.input<typeof schemaUtilizador>;

function FormUtilizador({
   control,
   errors,
   evento_key,
   ingresso_key,
   ingresso,
}: FormUtilizadorProps) {

   const inputsRestricao = {
      "outro": "Outro",
      "cpf": "CPF",
      "email": "EMAIL",
   };

   // console.log(ingresso_key)

   return (
      <VStack gap='md' >

         <Section.Root>
            <Text color='azul' marginHorizontal='sm'>{ingresso.nome}</Text>

            <HStack alignItems='center' mb='md'>
               <Circle variant='shadow' width={25} height={25} />
               <Text variant='labelInput'>Esse ingresso é pra mim {ingresso_key}</Text>
            </HStack>

            {/* {inputsRestricao[ingresso.tipo_restricao]} */}

            <InputText
               label='Nome'
               control={control}
               name={`lotes[${evento_key}].donos[${ingresso_key}].dono_ingresso.nome`}
               placeholder='Nome completo do utilizador'
               error={errors?.lotes?.[evento_key]?.donos?.[ingresso_key]?.dono_ingresso?.nome?.message}
            />

            <InputText
               label='E-mail'
               control={control}
               name={`lotes[${evento_key}].donos[${ingresso_key}].dono_ingresso.email`}
               placeholder='E-mail do utilizador'
               error={errors?.lotes?.[evento_key]?.donos?.[ingresso_key]?.dono_ingresso?.email?.message}
            />




         </Section.Root>
      </VStack>
   )
}

export function CarrinhoUtilizador() {
   const { isLoading, data } = useQuery({
      queryKey: ['obtemCarrinho'],
      queryFn: obtemCarrinho
   });

   const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador),
   });

   if (isLoading) {
      return;
   }

   useEffect(() => setValue("lotes", []), []);

   return (
      <Layout.Keyboard>
         <Layout.Root>
            <Layout.Header title='Utilizador' />
            <Layout.Scroll>
               <VStack gap="lg" marginBottom='md'>
                  <ResumoPedido />

                  <Card.Root>
                     <CarrinhoUtilizadorAtletica
                        name="atletica_slug"
                        control={control}
                        error={errors?.atletica_slug?.message}
                     />
                  </Card.Root>

                  {data?.eventos.map((evento) => (
                     evento.ingressos.map((ingresso, ingresso_key: number) => {
                        return new Array(ingresso.qtd).fill(null).map((_key, indice) => {
                           setValue(`lotes.${ingresso_key}.id`, ingresso.lote_id);
                           setValue(`lotes.${ingresso_key}.evento_ingresso_id`, ingresso.id);
                           setValue(`lotes.${ingresso_key}.donos.${indice}.usuario_proprio`, false);

                           return (
                              <FormUtilizador
                                 errors={errors}
                                 control={control}
                                 key={indice}
                                 evento_key={ingresso_key}
                                 ingresso_key={indice}
                                 ingresso={ingresso}
                              />
                           )
                        })
                     })
                  ))}

                  {/* <Text variant='header3'>{JSON.stringify(getValues(), null, 1)}</Text> */}

                  <Button onPress={handleSubmit((data) => {
                     console.log(JSON.stringify(data, null, 1));
                     // navigate('CarrinhoResumo');
                  })}
                     marginHorizontal="md">
                     Continuar
                  </Button>
               </VStack>
            </Layout.Scroll>
         </Layout.Root>
      </Layout.Keyboard>
   )
}
