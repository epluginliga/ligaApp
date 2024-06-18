import React,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueries } from '@tanstack/react-query';
import Animated,{ FadeIn,FadeInDown,FadeOut,FadeOutUp } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { z } from 'zod'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import VStack from '../../components/Views/Vstack'
import { InputText } from '../../components/Inputs/Text'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { obtemCarrinho } from '../../services/carrinho'
import { CarrinhoUtilizadorAtletica } from './CarrinhoUtilizadorAtletica'
import HStack from '../../components/Views/Hstack'
import Circle from '../../components/Views/Circle'
import Text from '../../components/Text'
import { Maskara,cpfMask } from '../../utils/Maskara'
import { Validacoes } from '../../utils/Validacoes'
import { Icon } from '../../icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { useCarrinho } from '../../hooks/carrinho';
import { fetchEventoAtleticas } from '../../services/eventos';

export const schemaUtilizador = z.object({
   lotes: z.array(
      z.object({
         id: z.string(),
         evento_ingresso_id: z.string(),
         donos: z.array(
            z.object({
               restricao: z.string().optional(),
               usuario_proprio: z.boolean().optional(),
               dono_ingresso: z.object({
                  nome: z.string({ message: "Obrigatório!" }).min(3,{ message: "Obrigatório!" }),
                  cpf: z.string({ message: "Obrigatório!" }).superRefine((val,ctx) => {
                     if (!Validacoes.validarCPF(val)) {
                        ctx.addIssue({
                           code: "custom",
                           message: "CPF inválido",
                        })
                     }
                  }),
               }),
            }),
         ),
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
   const [atribuiUser,serAtribuiUser] = useState<AtribuirUserProps | null>();
   const { total,evento } = useCarrinho();

   const { control,handleSubmit,formState: { errors },setValue,resetField } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador),
   });

   if (!evento) return;

   const [carrinho,atleticas] = useQueries({
      queries: [
         {
            queryKey: ['obtemCarrinhoPaginaCarrinho'],
            queryFn: () => {
               resetField("lotes");
               return obtemCarrinho();
            },
            refetchOnWindowFocus: true,
         },
         {
            queryKey: ['fetchEventoAtleticas',evento?.id],
            queryFn: () => fetchEventoAtleticas(evento.id),
            enabled: !!evento?.id,
         }
      ]
   });


   if (carrinho.isFetching || atleticas.isFetching) {
      return;
   }

   if (atleticas.data?.length === 1) {
      setValue("atletica_slug","nenhuma");
   }

   carrinho.data?.eventos.flatMap(item => item.ingressos).forEach((ingresso,ingresso_key: number) => {
      for (let i = 1; i <= ingresso.qtd; i++) {
         setValue(`lotes.${ingresso_key}.id`,ingresso.lote_id);
         setValue(`lotes.${ingresso_key}.evento_ingresso_id`,ingresso.id);
      }
   });

   const ingresso = carrinho?.data?.eventos?.flatMap(ingre => ingre.ingressos);
   const usuario = carrinho?.data?.usuario;

   return (
      <Layout.Keyboard>
         <Layout.Root>
            <Layout.Header title='Utilizador' />
            <Layout.Scroll>
               <VStack gap="lg" marginBottom='md'>

                  <Section.Root>
                     <Section.SubTitle>{evento?.nome} / {evento?.cidade} - {evento?.estado}</Section.SubTitle>
                     <Section.Title color='primary'>
                        Informe quem irá utilizar os ingressos
                     </Section.Title>
                  </Section.Root>

                  <Animated.View
                     entering={FadeIn}
                     exiting={FadeOut}>
                     <Card.Root>
                        {atleticas.data && atleticas.data?.length > 1 && <CarrinhoUtilizadorAtletica
                           data={atleticas.data}
                           setValue={(val: string) => setValue("atletica_slug",val)}
                           name="atletica_slug"
                           control={control}
                           error={errors?.atletica_slug?.message}
                        />}
                     </Card.Root>
                  </Animated.View>

                  {ingresso?.map((ingresso,ingresso_indice) => {
                     return new Array(ingresso.qtd).fill(null).map((_key,indice) => {
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
                                       disabled={atribuiUser !== undefined && !ativo}
                                       onPress={() => {
                                          if (!usuario) return;
                                          if (ativo) {
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.usuario_proprio`,false);
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`, "");
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`, "");
                                             return serAtribuiUser(undefined);
                                          }
                                          serAtribuiUser({
                                             [ingresso_indice]: {
                                                [indice]: true
                                             }
                                          });

                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.usuario_proprio`,true);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`,usuario?.nome);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`,cpfMask(usuario?.cpf));
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


                                    <Animated.View
                                       entering={FadeInDown.delay(indice * 500)}
                                       exiting={FadeOutUp}
                                    >

                                       {ingresso.possui_restricao ? (
                                          <InputText
                                             label={ingresso.restricao}
                                             control={control}
                                             name={`lotes.${ingresso_indice}.donos.${indice}.restricao`}
                                             placeholder={`${ingresso.restricao} do utilizador.`}
                                             error={errors?.lotes?.[ingresso_indice]?.donos?.[indice]?.dono_ingresso?.nome?.message}
                                          />
                                       ) : null}

                                    </Animated.View>

                                 </Section.Root>
                              </VStack>
                           </Animated.View>
                        )
                     })
                  })}

                  <Animated.View
                     entering={FadeInDown}
                     exiting={FadeOutUp}
                  >
                     <Section.Root>
                        <VStack>
                           <HStack alignItems='center' justifyContent='space-between'>
                              <Section.SubTitle>Total em ingressos: </Section.SubTitle>
                              <Text color='greenDark'>{Maskara.dinheiro(total)}
                                 <Text color='greenDark' fontSize={12}>{' '}+ Taxas</Text>
                              </Text>

                           </HStack>

                        </VStack>
                        {carrinho.data && (
                           <Button
                              onPress={handleSubmit((data) => {
                                 console.log(JSON.stringify(data,null,1));
                                 // navigate('CarrinhoResumo');
                              })}
                           >
                              Continuar
                           </Button>
                        )}
                     </Section.Root>
                  </Animated.View>




               </VStack>
            </Layout.Scroll>
         </Layout.Root>
      </Layout.Keyboard >
   )
}
