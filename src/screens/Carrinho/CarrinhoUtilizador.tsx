import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueries } from '@tanstack/react-query';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutUp } from 'react-native-reanimated';
import { Pressable, StatusBar } from 'react-native';
import { z } from 'zod'

import { Layout } from '../../components/Views/Layout'
import { Section } from '../../components/Section'
import VStack from '../../components/Views/Vstack'
import { InputText } from '../../components/Inputs/Text'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { atribuiUtilizador, obtemCarrinho } from '../../services/carrinho'
import HStack from '../../components/Views/Hstack'
import Circle from '../../components/Views/Circle'
import Text from '../../components/Text'
import { Maskara, cpfMask, dataMask } from '../../utils/Maskara'
import { Validacoes } from '../../utils/Validacoes'
import { Icon } from '../../icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { useCarrinho } from '../../hooks/carrinho';
import { fetchEventoAtleticas } from '../../services/eventos';
import { useNavigation } from '@react-navigation/native';
import { InputSelecionar } from '../../components/Inputs/Selecionar';
import { dataApp } from '../../utils/utils';
import { useCheckout } from '../../hooks/checkout';
import { PedidoConcluidoCancelado } from '../../components/PedidoConcluidoCancelado';

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
                  nome: z.string({ message: "Obrigatório!" }).min(3, { message: "Obrigatório!" }),
                  data_nascimento: z.string().optional(),
                  sexo: z.string().optional(),
                  cpf: z.string({ message: "Obrigatório!" }).superRefine((val, ctx) => {
                     if (!Validacoes.CPF(val)) {
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
   const [atribuiUser, serAtribuiUser] = useState<AtribuirUserProps | null>();
   const { total, evento, setCarrinhoId } = useCarrinho();
   const { statusPagamento } = useCheckout();
   const { navigate } = useNavigation();
   const { control, handleSubmit, formState: { errors }, setValue, resetField } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador),
   });

   const handleAtribuirUtilizador = useMutation({
      mutationFn: (data: FormUtilizador) => atribuiUtilizador((carrinho.data?.id || ""), data),
      onSuccess: () => navigate('CarrinhoResumo')
   });

   if (!evento) return;

   const [carrinho, atleticas] = useQueries({
      queries: [
         {
            queryKey: ['obtemCarrinhoPaginaCarrinho'],
            queryFn: async () => {
               resetField("lotes");
               const carrinho = await obtemCarrinho();
               if (carrinho.id) {
                  setCarrinhoId(carrinho?.id);
               }

               return carrinho;
            },
            refetchOnWindowFocus: true,
         },
         {
            queryKey: ['fetchEventoAtleticas', evento?.id],
            queryFn: () => fetchEventoAtleticas(evento.id),
            enabled: !!evento?.id,
         },
      ],
   });

   if (carrinho.isFetching || atleticas.isFetching) {
      return;
   }

   if (atleticas.data?.length === 1) {
      setValue("atletica_slug", "nenhuma");
   }

   carrinho.data?.eventos.flatMap(item => item.ingressos).forEach((ingresso, ingresso_key: number) => {
      for (let i = 1; i <= ingresso.qtd; i++) {
         setValue(`lotes.${ingresso_key}.id`, ingresso.lote_id);
         setValue(`lotes.${ingresso_key}.evento_ingresso_id`, ingresso.id);
      }
   });

   const ingresso = carrinho?.data?.eventos?.flatMap(ingre => ingre.ingressos);
   const usuario = carrinho?.data?.usuario;
   const atleticaFormulario = atleticas.data?.map(item => ({
      label: item.nome,
      name: item.slug
   })) || [];

   if (statusPagamento != "pendente" && statusPagamento != "") {
      return (
         <Layout.Root>
            <Layout.Header title={`Pedido ${statusPagamento}`} />
            <PedidoConcluidoCancelado status={statusPagamento} />
         </Layout.Root>
      )
   }

   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Keyboard>
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
                        {atleticaFormulario?.length > 1 && (
                           <InputSelecionar
                              name="atletica_slug"
                              control={control}
                              option={atleticaFormulario || []}
                              error={errors?.atletica_slug?.message}
                           />
                        )}
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
                                       disabled={atribuiUser !== undefined && !ativo}
                                       onPress={() => {
                                          if (!usuario) return;
                                          if (ativo) {
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.usuario_proprio`, false);
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`, "");
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`, "");
                                             setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.sexo`, "");
                                             return serAtribuiUser(undefined);
                                          }
                                          serAtribuiUser({
                                             [ingresso_indice]: {
                                                [indice]: true
                                             }
                                          });

                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.usuario_proprio`, true);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`, usuario?.nome);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`, cpfMask(usuario?.cpf));
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.sexo`, usuario?.sexo);
                                          setValue(`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.data_nascimento`, dataApp(usuario?.data_nascimento).diaMesAnoISOBR());
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
                                       entering={FadeInDown.delay(indice * 500)}
                                       exiting={FadeOutUp}
                                    >
                                       <VStack gap='md'>
                                          {ingresso.possui_restricao ? (
                                             <InputText
                                                label={ingresso.restricao}
                                                control={control}
                                                name={`lotes.${ingresso_indice}.donos.${indice}.restricao`}
                                                placeholder={`${ingresso.restricao} do utilizador.`}
                                                error={errors?.lotes?.[ingresso_indice]?.donos?.[indice]?.restricao?.message}
                                             />
                                          ) : null}
                                       </VStack>

                                    </Animated.View>
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

                                    {ingresso.classificacao_idade !== "livre" && (
                                       <Animated.View
                                          entering={FadeInDown.delay(indice * 500)}
                                          exiting={FadeOutUp}
                                       >
                                          <InputText
                                             editable={!ativo}
                                             label='Data de nascimento'
                                             keyboardType='decimal-pad'
                                             returnKeyType='done'
                                             mask={dataMask}
                                             control={control}
                                             name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.data_nascimento`}
                                             placeholder='dd/mm/aaaa'
                                             error={errors?.lotes?.[ingresso_indice]?.donos?.[indice]?.dono_ingresso?.data_nascimento?.message}
                                          />

                                       </Animated.View>
                                    )}


                                    {ingresso.sexo && (
                                       <Animated.View
                                          entering={FadeInDown.delay(indice * 500)}
                                          exiting={FadeOutUp}
                                       >
                                          <InputSelecionar
                                             placeholder='Selecione o sexo'
                                             label='Sexo'
                                             name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.sexo`}
                                             control={control}
                                             option={[
                                                {
                                                   label: "Masculino",
                                                   name: "masculino"
                                                },
                                                {
                                                   label: "Feminino",
                                                   name: "feminino"
                                                },
                                                {
                                                   label: "Não informar",
                                                   name: "naoinformar"
                                                }
                                             ]}
                                             error={errors?.lotes?.[ingresso_indice]?.donos?.[indice]?.dono_ingresso?.sexo?.message}
                                          />
                                       </Animated.View>
                                    )}
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
                                 // console.log(JSON.stringify(data,null,1));
                                 return handleAtribuirUtilizador.mutate(data);
                              })}
                           >
                              Continuar
                           </Button>
                        )}
                     </Section.Root>
                  </Animated.View>

               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard >
      </>
   )
}
