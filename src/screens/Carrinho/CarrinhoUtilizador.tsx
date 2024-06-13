import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutUp } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { z } from 'zod'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import VStack from '../../components/Views/Vstack'
import { InputText } from '../../components/Inputs/Text'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { ResumoPedido } from '../../components/ResumoPedido'
import { obtemCarrinho } from '../../services/carrinho'
import { CarrinhoUtilizadorAtletica } from './CarrinhoUtilizadorAtletica'
import HStack from '../../components/Views/Hstack'
import Circle from '../../components/Views/Circle'
import Text from '../../components/Text'
import { cpfMask } from '../../utils/Maskara'
import { Validacoes } from '../../utils/Validacoes'
import { Icon } from '../../icons';
import { color, useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';

const schemaUtilizador = z.object({
   lotes: z.array(
      z.object({
         id: z.string(),
         evento_ingresso_id: z.string(),
         donos: z.array(
            z.object({
               usuario_proprio: z.boolean(),
               dono_ingresso: z.object({
                  nome: z.string().min(3, {
                     message: "Obrigatório!"
                  }),
                  cpf: z.string().superRefine((val, ctx) => {
                     if (!Validacoes.validarCPF(val)) {
                        ctx.addIssue({
                           code: "custom",
                           message: "CPF inválido",
                        })
                     }
                  }),
               })
            })
         ),
      })
   ),
   atletica_slug: z.string({
      message: "Obrigatório"
   }),
});

export type FormUtilizador = z.infer<typeof schemaUtilizador>;

export function CarrinhoUtilizador() {
   const { colors } = useTheme<Theme>();
   const [atribuiUsuario, setAtribuiUsuario] = useState(false);

   const { data, isLoading } = useQuery({
      queryKey: ['obtemCarrinhoPaginaCarrinho'],
      queryFn: obtemCarrinho,
      refetchOnWindowFocus: true,
   });

   const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador),
   });

   if (isLoading && !data) {
      return;
   }

   data?.eventos.flatMap(item => item.ingressos).map((ingresso, ingresso_key: number) => {
      return new Array(ingresso.qtd).fill(null).map((_key, indice) => {
         setValue(`lotes.${ingresso_key}.id`, ingresso.lote_id);
         setValue(`lotes.${ingresso_key}.evento_ingresso_id`, ingresso.id);
         setValue(`lotes.${ingresso_key}.donos.${indice}.usuario_proprio`, false);
      });
   })

   const ingresso = data?.eventos?.flatMap(ingre => ingre.ingressos);
   const usuario = data?.usuario;

   console.log("uso");

   return (
      <Layout.Keyboard>
         <Layout.Root>
            <Layout.Header title='Utilizador' />
            <Layout.Scroll>
               <VStack gap="lg" marginBottom='md'>
                  <Animated.View
                     entering={FadeInDown}
                     exiting={FadeOutUp}
                  >
                     <ResumoPedido />
                  </Animated.View>

                  <Animated.View
                     entering={FadeIn}
                     exiting={FadeOut}>
                     <Card.Root>
                        <CarrinhoUtilizadorAtletica
                           name="atletica_slug"
                           control={control}
                           error={errors?.atletica_slug?.message}
                        />
                     </Card.Root>
                  </Animated.View>

                  {ingresso?.map((ingresso, ingresso_indice) => {
                     return new Array(ingresso.qtd).fill(null).map((_key, indice) => {
                        const nome = watch(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`);
                        const cpf = watch(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`);
                        return (
                           <Animated.View
                              entering={FadeIn}
                              exiting={FadeOut}
                              key={indice}
                           >
                              <VStack gap='md'>
                                 <Section.Root>
                                    <Text color='azul' marginHorizontal='sm'>{ingresso.nome}</Text>

                                    <Pressable
                                       // disabled={ !nome && !cpf}
                                       style={{ opacity: !nome && !cpf && !atribuiUsuario ? 0.4 : 1 }}
                                       onPress={() => {
                                          if (!usuario) return;

                                          if (nome && cpf) {
                                             reset();
                                             setAtribuiUsuario(false);
                                             return;
                                          }

                                          if (atribuiUsuario) {
                                             reset();
                                          }

                                          setAtribuiUsuario(true);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`, usuario?.nome);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`, usuario?.cpf);
                                       }}>
                                       <HStack alignItems='center' mb='md'>
                                          {nome && cpf ? (
                                             <Icon.CheckCircle color={colors.greenDark} />
                                          ) : (
                                             <Circle variant='shadow' width={25} height={25} />
                                          )}
                                          <Text variant='labelInput'>Esse ingresso é pra mim</Text>
                                       </HStack>
                                    </Pressable>

                                    <Animated.View
                                       entering={FadeInDown}
                                       exiting={FadeOutUp}
                                    >
                                       <InputText
                                          editable={!!nome}
                                          label='Nome'
                                          control={control}
                                          name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`}
                                          placeholder='Nome completo do utilizador'
                                          error={errors?.lotes?.[ingresso_indice]?.donos?.[indice]?.dono_ingresso?.nome?.message}
                                       />
                                    </Animated.View>

                                    <Animated.View
                                       entering={FadeInDown.delay(indice * 500)}
                                       exiting={FadeOutUp}
                                    >
                                       <InputText
                                          editable={!!cpf}
                                          label='CPF'
                                          mask={cpfMask}
                                          control={control}
                                          name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`}
                                          placeholder='CPF do utilizador'
                                          error={errors?.lotes?.[ingresso_indice]?.donos?.[indice]?.dono_ingresso?.cpf?.message}
                                       />
                                    </Animated.View>
                                 </Section.Root>
                              </VStack>
                           </Animated.View>
                        )
                     })
                  })}

                  {data && (
                     <Button
                        onPress={handleSubmit((data) => {
                           console.log(JSON.stringify(data, null, 1));
                           // navigate('CarrinhoResumo');
                        })}
                        marginHorizontal="md">
                        Continuar
                     </Button>
                  )}

               </VStack>
            </Layout.Scroll>
         </Layout.Root>
      </Layout.Keyboard >
   )
}
