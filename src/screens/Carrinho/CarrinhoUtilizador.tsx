import React, { useState } from 'react';
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
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';

const schemaUtilizador = z.object({
   lotes: z.array(
      z.object({
         id: z.string(),
         evento_ingresso_id: z.string(),
         donos: z.array(
            z.object({
               usuario_proprio: z.boolean().optional(),
               dono_ingresso: z.object({
                  nome: z.string({
                     message: "Obrigatório!"
                  }).min(3, {
                     message: "Obrigatório!"
                  }),
                  cpf: z.string({
                     message: "Obrigatório!"
                  }).superRefine((val, ctx) => {

                     if (!Validacoes.validarCPF(val)) {
                        ctx.addIssue({
                           code: "custom",
                           message: "CPF inválido",
                        })
                     }
                  }),
               }),
            })
         ).superRefine((val, ctx) => {
            const conjuntoCPFs = new Set();
            for (const item of val) {
               if (conjuntoCPFs.has(item.dono_ingresso.cpf)) {
                  ctx.addIssue({
                     code: z.ZodIssueCode.custom,
                     message: "Ingresso não pode ser atribuido no mesmo CPF!",
                     fatal: true,
                  });
               }
               conjuntoCPFs.add(item.dono_ingresso.cpf);
            }


         }),
      }),
   ),
   atletica_slug: z.string({
      message: "Obrigatório!"
   }),
});

export type FormUtilizador = z.infer<typeof schemaUtilizador>;
type AtribuirUserProps = {
   [key: number]: any
}
export function CarrinhoUtilizador() {
   const { colors } = useTheme<Theme>();
   const [atribuiUser, serAtribuiUser] = useState<AtribuirUserProps | null>();

   const { data, isLoading } = useQuery({
      queryKey: ['obtemCarrinhoPaginaCarrinho'],
      queryFn: obtemCarrinho,
      refetchOnWindowFocus: true,
   });

   const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormUtilizador>({
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
   });

   const ingresso = data?.eventos?.flatMap(ingre => ingre.ingressos);
   const usuario = data?.usuario;
   
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
                        const ativo = atribuiUser?.[ingresso_indice]?.[indice];

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
                                       onPress={() => {
                                          if (!usuario) return;

                                          new Array(ingresso.qtd).fill(null).map((_key, indice_clean) => {
                                             setValue(`lotes.${ingresso_indice}.donos.${indice_clean}.usuario_proprio`, false);
                                             setValue(`lotes.${ingresso_indice}.donos.${indice_clean}.dono_ingresso.nome`, "");
                                             setValue(`lotes.${ingresso_indice}.donos.${indice_clean}.dono_ingresso.cpf`, "");
                                          });

                                          if (ativo) {
                                             serAtribuiUser(null);
                                             return;
                                          }

                                          serAtribuiUser({
                                             [ingresso_indice]: {
                                                [indice]: true
                                             }
                                          });

                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.usuario_proprio`, true);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`, usuario?.nome);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`, cpfMask(usuario?.cpf));
                                       }}>

                                       <HStack alignItems='center' mb='md'>
                                          {ativo ? (
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
                                          editable={!ativo}
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
                                          editable={!ativo}
                                          label='CPF'
                                          keyboardType='decimal-pad'
                                          returnKeyType='done'
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

                  <Text textAlign='center' variant='header3' color='buttonPrimaryBackground'>
                     {errors?.lotes?.[0]?.donos?.root?.message}
                  </Text>

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
