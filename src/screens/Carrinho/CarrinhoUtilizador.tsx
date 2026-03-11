import React, { useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueries } from '@tanstack/react-query';
import Animated, {
   FadeIn,
   FadeInDown,
   FadeOut,
   FadeOutUp,
} from 'react-native-reanimated';
import { Pressable, StatusBar } from 'react-native';

import { Section } from '../../components/Section';
import VStack from '../../components/Views/Vstack';
import { InputText } from '../../components/Inputs/Text';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { atribuiUtilizador, obtemCarrinho } from '../../services/carrinho';
import HStack from '../../components/Views/Hstack';
import Circle from '../../components/Views/Circle';
import Text from '../../components/Text';
import { Maskara, cpfMask, dataMask, telefoneMask } from '../../utils/Maskara';
import { Validacoes } from '../../utils/Validacoes';
import { Icon } from '../../icons';
import { Theme } from '../../theme/default';
import { useCarrinho } from '../../hooks/carrinho';
import { fetchEventoAtleticas } from '../../services/eventos';
import { useNavigation } from '@react-navigation/native';
import { InputSelecionar } from '../../components/Inputs/Selecionar';
import { dataApp } from '../../utils/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { z } from 'zod';
import { useTheme } from '@shopify/restyle';
import { Layout } from '../../components/Views/Layout';

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
                  nome: z
                     .string({ message: 'Obrigatório!' })
                     .min(3, { message: 'Obrigatório!' }),
                  data_nascimento: z.string().optional(),
                  sexo: z.string().optional(),
                  telefone: z
                     .string({
                        message: 'Obrigatório!',
                     })
                     .superRefine((val, ctx) => {
                        if (!Validacoes.telefone(val)) {
                           ctx.addIssue({
                              code: 'custom',
                              message: 'Telefone inválido',
                           });
                        }
                     }),
                  email: z
                     .string()
                     .email({ message: 'Email inválido' })
                     .optional(),
                  cpf: z
                     .string({ message: 'Obrigatório!' })
                     .superRefine((val, ctx) => {
                        if (!Validacoes.CPF(val)) {
                           ctx.addIssue({
                              code: 'custom',
                              message: 'CPF inválido',
                           });
                        }
                     }),
               }),
            }),
         ),
      }),
   ),
   atletica_slug: z.string({
      message: 'Obrigatório!',
   }),
});

export type FormUtilizador = z.infer<typeof schemaUtilizador>;
type AtribuirUserProps = {
   [key: number]: any;
};

export function CarrinhoUtilizador() {
   const { colors } = useTheme<Theme>();
   const [atribuiUser, serAtribuiUser] = useState<AtribuirUserProps | null>();
   const { total, evento, setCarrinhoId } = useCarrinho();
   const { navigate } = useNavigation();
   const insets = useSafeAreaInsets();

   const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      resetField,
      watch,
   } = useForm<FormUtilizador>({
      resolver: zodResolver(schemaUtilizador),
   });

   // Função para limpar os campos do formulário
   const limparCamposUsuario = useCallback(
      (ingressoIndice: number, indice: number) => {
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.usuario_proprio`,
            false,
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.nome`,
            '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.cpf`,
            '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.sexo`,
            '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.data_nascimento`,
            '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.email`,
            '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.telefone`,
            '',
         );
      },
      [setValue],
   );

   // Função para preencher os campos com dados do usuário logado
   const preencherCamposUsuario = useCallback(
      (
         ingressoIndice: number,
         indice: number,
         usuario: any,
      ) => {
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.usuario_proprio`,
            true,
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.nome`,
            usuario?.nome || '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.cpf`,
            cpfMask(usuario?.cpf) || '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.sexo`,
            usuario?.sexo || '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.email`,
            usuario?.email || '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.telefone`,
            usuario?.telefone || '',
         );
         setValue(
            `lotes.${ingressoIndice}.donos.${indice}.dono_ingresso.data_nascimento`,
            dataApp(usuario?.data_nascimento).diaMesAnoISOBR() || '',
         );
      },
      [setValue],
   );

   // Função para alternar atribuição de usuário
   const alternarAtribuicaoUsuario = useCallback(
      (
         ingressoIndice: number,
         indice: number,
         ativo: boolean,
         usuario: any,
      ) => {
         if (!usuario) return;

         if (ativo) {
            limparCamposUsuario(ingressoIndice, indice);
            serAtribuiUser(undefined);
         } else {
            serAtribuiUser({
               [ingressoIndice]: {
                  [indice]: true,
               },
            });
            preencherCamposUsuario(ingressoIndice, indice, usuario);
         }
      },
      [limparCamposUsuario, preencherCamposUsuario],
   );

   // Função para processar dados antes do envio
   const processarDadosEnvio = (data: FormUtilizador) => {
      if (data.lotes) {
         data.lotes.forEach(lote => {
            lote.donos.forEach(dono => {
               if (dono.dono_ingresso?.telefone) {
                  dono.dono_ingresso.telefone =
                     dono.dono_ingresso.telefone.replace(/\D/g, '');
               }
            });
         });
      }
      return data;
   };

   // Mutation para atribuir utilizador
   const handleAtribuirUtilizador = useMutation({
      mutationFn: (data: FormUtilizador) => {
         if (!carrinho.data?.id) {
            return Promise.reject(new Error('Carrinho não encontrado.'));
         }

         const dadosProcessados = processarDadosEnvio(data);
         return atribuiUtilizador(carrinho.data.id, dadosProcessados);
      },
      onSuccess: () => navigate('CarrinhoResumo'),
   });

   if (!evento) return;

   const [carrinho, atleticas] = useQueries({
      queries: [
         {
            queryKey: ['obtemCarrinhoPaginaCarrinho'],
            queryFn: async () => {
               resetField('lotes');
               const carrinho = await obtemCarrinho();
               if (carrinho.id) {
                  setCarrinhoId(carrinho?.id);
               }

               return carrinho;
            },
            refetchOnWindowFocus: true,
         },
         {
            queryKey: ['fetchEventoAtleticas', evento.id],
            queryFn: () => fetchEventoAtleticas(evento.id),
            enabled: !!evento?.id,
         },
      ],
   });

   if (carrinho.isFetching || atleticas.isFetching) {
      return;
   }

   if (atleticas.data?.length === 0) {
      setValue('atletica_slug', 'nenhuma');
   }

   carrinho.data?.eventos
      .flatMap(item => item.ingressos)
      .forEach((ingresso, ingresso_key: number) => {
         for (let i = 1; i <= ingresso.qtd; i++) {
            setValue(`lotes.${ingresso_key}.id`, ingresso.lote_id);
            setValue(`lotes.${ingresso_key}.evento_ingresso_id`, ingresso.id);
         }
      });

   const ingresso = carrinho?.data?.eventos?.flatMap(ingre => ingre.ingressos);
   const usuario = carrinho?.data?.usuario;

   const atleticaFormulario =
      atleticas.data?.map(item => ({
         label: item.nome,
         name: item.slug,
      })) || [];

   return (
      <>
         <StatusBar barStyle="dark-content" />

         <Layout.Keyboard>
            <Layout.Header
               title="Utilizador"
               handleBack={() => navigate('Home')}
            />
            <Layout.Scroll>
               <VStack gap="lg" marginBottom="md">
                  <Section.Root>
                     <Section.SubTitle>
                        {evento?.nome} / {evento?.nome_local}
                     </Section.SubTitle>
                     <Section.Title color="primary">
                        Informe quem irá utilizar os ingressos
                     </Section.Title>
                  </Section.Root>

                  {atleticaFormulario?.length > 0 && (
                     <Animated.View entering={FadeIn} exiting={FadeOut}>
                        <Card.Root>
                           <InputSelecionar
                              name="atletica_slug"
                              control={control}
                              option={atleticaFormulario || []}
                              error={errors?.atletica_slug?.message}
                           />
                        </Card.Root>
                     </Animated.View>
                  )}

                  {ingresso?.map((ingresso, ingresso_indice) => {
                     return new Array(ingresso.qtd)
                        .fill(null)
                        .map((_key, indice) => {
                           const ativo =
                              atribuiUser?.[ingresso_indice]?.[indice];

                           // Verifica se cada campo tem valor para desabilitar apenas quando preenchido
                           const nomeValue = watch(
                              `lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`,
                           );
                           const emailValue = watch(
                              `lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.email`,
                           );
                           const cpfValue = watch(
                              `lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`,
                           );
                           const dataNascimentoValue = watch(
                              `lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.data_nascimento`,
                           );
                           const sexoValue = watch(
                              `lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.sexo`,
                           );

                           // Função para determinar se campo deve ser editável
                           const isCampoEditavel = (fieldValue: any) => {
                              return !(ativo && fieldValue);
                           };

                           return (
                              <Animated.View
                                 entering={FadeIn}
                                 exiting={FadeOut}
                                 key={indice}
                              >
                                 <VStack gap="md">
                                    <Section.Root tituloFechar={ingresso.nome}>
                                       <Pressable
                                          disabled={
                                             atribuiUser !== undefined && !ativo
                                          }
                                          onPress={() =>
                                             alternarAtribuicaoUsuario(
                                                ingresso_indice,
                                                indice,
                                                ativo,
                                                usuario,
                                             )
                                          }
                                       >
                                          <HStack alignItems="center">
                                             {ativo ? (
                                                <Icon.CheckCircle
                                                   color={colors.greenDark}
                                                />
                                             ) : (
                                                <Circle
                                                   variant="shadow"
                                                   width={25}
                                                   height={25}
                                                />
                                             )}
                                             <Text variant="labelInput">
                                                Esse ingresso é pra mim
                                             </Text>
                                          </HStack>
                                       </Pressable>

                                       {/* RESTRICAO */}
                                       {ingresso.restricao &&
                                          ingresso.possui_restricao && (
                                             <Animated.View
                                                entering={FadeInDown.delay(
                                                   indice * 500,
                                                )}
                                                exiting={FadeOutUp}
                                             >
                                                <InputText
                                                   label={ingresso.restricao}
                                                   control={control}
                                                   name={`lotes.${ingresso_indice}.donos.${indice}.restricao`}
                                                   placeholder={`${ingresso.restricao}`}
                                                   error={
                                                      errors?.lotes?.[
                                                         ingresso_indice
                                                      ]?.donos?.[indice]
                                                         ?.restricao?.message
                                                   }
                                                />
                                             </Animated.View>
                                          )}

                                       {/* Nome */}
                                       <Animated.View
                                          entering={FadeInDown}
                                          exiting={FadeOutUp}
                                       >
                                          <InputText
                                             editable={isCampoEditavel(
                                                nomeValue,
                                             )}
                                             label="Nome"
                                             control={control}
                                             name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.nome`}
                                             placeholder="Nome completo do utilizador"
                                             error={
                                                errors?.lotes?.[ingresso_indice]
                                                   ?.donos?.[indice]
                                                   ?.dono_ingresso?.nome
                                                   ?.message
                                             }
                                          />
                                       </Animated.View>

                                       {/* E-mail */}
                                       <Animated.View
                                          entering={FadeInDown}
                                          exiting={FadeOutUp}
                                       >
                                          <InputText
                                             editable={isCampoEditavel(
                                                emailValue,
                                             )}
                                             label="E-mail"
                                             keyboardType="email-address"
                                             returnKeyType="done"
                                             autoCapitalize="none"
                                             autoComplete="email"
                                             autoCorrect={false}
                                             control={control}
                                             name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.email`}
                                             placeholder="E-mail do utilizador"
                                             error={
                                                errors?.lotes?.[ingresso_indice]
                                                   ?.donos?.[indice]
                                                   ?.dono_ingresso?.email
                                                   ?.message
                                             }
                                          />
                                       </Animated.View>

                                       {/* Telefone */}
                                       <Animated.View
                                          entering={FadeInDown}
                                          exiting={FadeOutUp}
                                       >
                                          <InputText
                                             label="Telefone"
                                             keyboardType="phone-pad"
                                             returnKeyType="done"
                                             control={control}
                                             mask={telefoneMask}
                                             name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.telefone`}
                                             placeholder="(xx) xxxxx-xxxx"
                                             error={
                                                errors?.lotes?.[ingresso_indice]
                                                   ?.donos?.[indice]
                                                   ?.dono_ingresso?.telefone
                                                   ?.message
                                             }
                                          />
                                       </Animated.View>

                                       {/* CPF */}
                                       <Animated.View
                                          entering={FadeInDown}
                                          exiting={FadeOutUp}
                                       >
                                          <InputText
                                             editable={isCampoEditavel(
                                                cpfValue,
                                             )}
                                             label="CPF"
                                             keyboardType="decimal-pad"
                                             returnKeyType="done"
                                             mask={cpfMask}
                                             control={control}
                                             name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.cpf`}
                                             placeholder="CPF do utilizador"
                                             error={
                                                errors?.lotes?.[ingresso_indice]
                                                   ?.donos?.[indice]
                                                   ?.dono_ingresso?.cpf?.message
                                             }
                                          />
                                       </Animated.View>

                                       {/* Data de nascimento */}
                                       {ingresso.classificacao_idade !==
                                          'livre' && (
                                          <Animated.View
                                             entering={FadeInDown}
                                             exiting={FadeOutUp}
                                          >
                                             <InputText
                                                editable={isCampoEditavel(
                                                   dataNascimentoValue,
                                                )}
                                                label="Data de nascimento"
                                                keyboardType="decimal-pad"
                                                returnKeyType="done"
                                                mask={dataMask}
                                                control={control}
                                                name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.data_nascimento`}
                                                placeholder="dd/mm/aaaa"
                                                error={
                                                   errors?.lotes?.[
                                                      ingresso_indice
                                                   ]?.donos?.[indice]
                                                      ?.dono_ingresso
                                                      ?.data_nascimento?.message
                                                }
                                             />
                                          </Animated.View>
                                       )}

                                       {/* Sexo */}
                                       {ingresso.sexo && (
                                          <Animated.View
                                             entering={FadeInDown}
                                             exiting={FadeOutUp}
                                          >
                                             <InputSelecionar
                                                editable={isCampoEditavel(
                                                   sexoValue,
                                                )}
                                                placeholder="Selecione o sexo"
                                                label="Sexo"
                                                name={`lotes.${ingresso_indice}.donos.${indice}.dono_ingresso.sexo`}
                                                control={control}
                                                option={[
                                                   {
                                                      label: 'Masculino',
                                                      name: 'masculino',
                                                   },
                                                   {
                                                      label: 'Feminino',
                                                      name: 'feminino',
                                                   },
                                                   {
                                                      label: 'Não informar',
                                                      name: 'naoinformar',
                                                   },
                                                ]}
                                                error={
                                                   errors?.lotes?.[
                                                      ingresso_indice
                                                   ]?.donos?.[indice]
                                                      ?.dono_ingresso?.sexo
                                                      ?.message
                                                }
                                             />
                                          </Animated.View>
                                       )}
                                    </Section.Root>
                                 </VStack>
                              </Animated.View>
                           );
                        });
                  })}

                  <Animated.View
                     entering={FadeInDown}
                     exiting={FadeOutUp}
                     style={{ marginBottom: insets.bottom }}
                  >
                     <Section.Root gap="lg">
                        <VStack>
                           <HStack
                              alignItems="center"
                              justifyContent="space-between"
                           >
                              <Section.SubTitle>
                                 Total em ingressos:{' '}
                              </Section.SubTitle>
                              <Text color="greenDark">
                                 {Maskara.dinheiro(total)}
                                 <Text color="greenDark" fontSize={12}>
                                    {' '}
                                    + Taxas
                                 </Text>
                              </Text>
                           </HStack>
                        </VStack>
                        {carrinho.data && (
                           <Button
                              onPress={handleSubmit(data =>
                                 handleAtribuirUtilizador.mutate(data),
                              )}
                           >
                              Continuar
                           </Button>
                        )}
                     </Section.Root>
                  </Animated.View>
               </VStack>
            </Layout.Scroll>
         </Layout.Keyboard>
      </>
   );
}
