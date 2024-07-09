import React from 'react';
import { Section } from '../../components/Section';
import { ModalApp } from '../../components/Modal';
import { Icon } from '../../icons';
import HStack from '../../components/Views/Hstack';
import VStack from '../../components/Views/Vstack';
import { Maskara } from '../../utils/Maskara';
import { useCarrinho } from '../../hooks/carrinho';
import Text from '../../components/Text';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../components/Inputs/Text';
import { Layout } from '../../components/Views/Layout';
import { Button } from '../../components/Button';
import { Pressable,View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation,useQueries,useQuery,useQueryClient } from '@tanstack/react-query';
import { aplicaCupomDesconto,obtemCarrinho,removeCupomDesconto } from '../../services/carrinho';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { PayloadCupomAplicado } from '../../services/@carrinho';
import Circle from '../../components/Views/Circle';

const schema = z.object({
   codigo: z.string().min(3,"Código é obrigatório"),
});

type CupomForm = z.input<typeof schema>;

export function CarrinhoCupomDesconto() {
   const { total,carrinhoId,setCupom,cupom } = useCarrinho();
   const insets = useSafeAreaInsets();
   const { colors } = useTheme<Theme>();

   const { control,handleSubmit,formState: { errors }
   } = useForm<CupomForm>({
      resolver: zodResolver(schema)
   });

   const onSubmit = useMutation({
      mutationKey: ['handleAplicaCupom'],
      mutationFn: (codigo: CupomForm) => aplicaCupomDesconto(carrinhoId,codigo.codigo),
      onSuccess: async () => {
         const carrinho = await obtemCarrinho();
         if (carrinho?.cupom) {
            setCupom(carrinho?.cupom);
         }
      },
      onError(error) {
         console.log(error)
      },
   });

   const deletaCupom = useMutation({
      mutationKey: ['handleAplicaCupom'],
      mutationFn: () => removeCupomDesconto(carrinhoId),
      onSuccess: () => {
         setCupom({} as PayloadCupomAplicado);
      },
      onError(error) {
         console.log(error)
      },
   });


   return (
      <Section.Root>
         <ModalApp handleOpen={(
            <HStack alignItems='center'>
               {cupom?.codigo ? <Icon.CheckCircle color={colors.greenDark} /> : <Icon.Ticket />}

               {cupom?.codigo ? (
                  <HStack alignItems='center'>
                     <Section.Title color='greenDark'>
                        Cupom aplicado!
                     </Section.Title>

                     <Pressable onPress={() => deletaCupom.mutate()}>
                        <HStack
                           justifyContent='center'
                           alignItems='center'
                           borderWidth={1}
                           p="xs"
                           px='sm'
                           backgroundColor='background_red_tab'
                           borderRadius={4}
                           borderColor='buttonPrimaryBackground'>
                           <Icon.Trash size={12} />
                           <Text color='primary' variant='header3'>
                              Deletar
                           </Text>
                        </HStack>
                     </Pressable>

                  </HStack>
               ) : (
                  <Section.Title >
                     Cupom de Desconto?
                  </Section.Title>
               )}
            </HStack>
         )}>

            <Layout.Keyboard>
               <Layout.Scroll contentContainerStyle={{ flex: 1 }}>
                  <VStack justifyContent='space-between' flex={1} m='sm'>
                     <InputText
                        label="Cupom"
                        iconLeft={<Icon.Ticket size={24} />}
                        name='codigo'
                        placeholder='Digite o código do cupom'
                        control={control}
                        error={errors?.codigo?.message}
                     />

                     <HStack flex={1} position='relative'>
                        <Icon.CheckCircle size={40} color={colors.greenDark} />
                        <Text>{cupom.tipo_desconto === "percentual" ? total - cupom.valor : ""}</Text>
                     </HStack>

                     <View style={{ marginBottom: insets.bottom }}>
                        <Button
                           loading={onSubmit.isPending}
                           onPress={handleSubmit((data) => onSubmit.mutate(data))}>
                           Buscar
                        </Button>
                     </View>
                  </VStack>
               </Layout.Scroll>
            </Layout.Keyboard>

         </ModalApp>

         <VStack>
            <Section.SubTitle>
               {cupom?.id ? `Subtotal: ` : `Total do pedido`}:  {Maskara.dinheiro(total)}
            </Section.SubTitle>
            {cupom.valor && <Text variant='header' fontSize={16} color='greenDark'>Valor com desconto: {Maskara.dinheiro(cupom.valor)}</Text>}
         </VStack>
      </Section.Root>
   )
}