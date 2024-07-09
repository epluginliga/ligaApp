import React, { useCallback } from 'react';
import { Section } from '../../components/Section';
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
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { aplicaCupomDesconto, obtemCarrinho, removeCupomDesconto } from '../../services/carrinho';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';
import { PayloadCupomAplicado } from '../../services/@carrinho';
import { ListEmptyComponent } from '../../components/ListEmptyComponent';
import Circle from '../../components/Views/Circle';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Card } from '../../components/Card';

const tipoDesconto: { [key: string]: string } = {
   "percentual": "%",
   "fixo": "R$"
};

export function TituloCardCupom({ cupom }: { cupom: PayloadCupomAplicado }) {
   const { carrinhoId, setCupom, total, totalCalculado } = useCarrinho();

   const deletaCupom = useMutation({
      mutationKey: ['handleRemoveCupom'],
      mutationFn: () => removeCupomDesconto(carrinhoId),
      onSuccess: () => {
         setCupom({} as PayloadCupomAplicado);
      },

   });

   if (!cupom?.id) {
      return (
         <Section.Root>
            <HStack alignItems='center'>
               <Icon.Ticket />
               <Section.Title>
                  Cupom de Desconto?
               </Section.Title>
            </HStack>
            <Section.SubTitle>
               Total do pedido: <Section.SubTitle>{Maskara.dinheiro(total)}</Section.SubTitle>
               <Section.Span>
                  {' '}+ taxas
               </Section.Span>
            </Section.SubTitle>

         </Section.Root>
      );
   };


   return (
      <Section.Root>
         <HStack alignItems='center' justifyContent='space-between'>
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
                  borderRadius={6}
                  borderColor='buttonPrimaryBackground'>
                  <Icon.Trash size={12} />
                  <Text color='primary' variant='header3'>
                     remover!
                  </Text>
               </HStack>
            </Pressable>
         </HStack>

         <VStack>
            <Section.Span>
               Você ganhou:
               <Text variant='header2'
                  color='greenDark'
                  textDecorationLine='underline'>
                  {cupom.valor}{tipoDesconto[cupom.tipo_desconto]}
               </Text> de desconto
            </Section.Span>
            
            <HStack alignItems='center'>
               <Section.SubTitle>
                  De: <Section.SubTitle textDecorationLine="line-through">{Maskara.dinheiro(total)}</Section.SubTitle>
               </Section.SubTitle>
               <Section.Title color='greenDark'>{`Por: ${Maskara.dinheiro(totalCalculado)}`}</Section.Title>
            </HStack>
         </VStack>
         
      </Section.Root>
   )
}

function Sucesso({ data }: { data: PayloadCupomAplicado }) {
   const { colors } = useTheme<Theme>();

   if (!data) return;

   return (
      <VStack flex={1} alignContent='center' justifyContent='center'>

         <Section.Root flex={1}>
            <HStack alignItems='center' position='relative'>
               <Icon.CheckCircle size={28} color={colors.greenDark} />
               <Section.Title>Cupom <Text color='primary' textTransform='uppercase'>#{data?.codigo}</Text> aplicado!</Section.Title>
            </HStack>

            <Section.SubTitle>{data.descricao}</Section.SubTitle>

            <HStack alignItems='center'>

               <Section.SubTitle>Você ganhou: <Text variant='header2' color='greenDark' textDecorationLine='underline'>
                  {data.valor}{tipoDesconto[data.tipo_desconto]}</Text> de desconto
               </Section.SubTitle>
            </HStack>
         </Section.Root>
      </VStack>
   )
}

type StatusCupom = "error" | "idle" | "pending" | "success";
function Error({ status }: { status: StatusCupom }) {
   const msgs: { [key: string]: string } = {
      error: 'Cupom não encontrado!',
      idle: 'Use seu Cupom de desconto!'
   }
   const { colors } = useTheme<Theme>();

   if (status === "pending") {
      return (
         <VStack flex={1} alignContent='center' justifyContent='center'>
            <Animated.View
               entering={FadeIn}
               exiting={FadeOut}>
               <Card.Root gap='lg' paddingVertical='lg' flexDirection='column' justifyContent='center' alignItems='center'>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Card.Title color='bege_200'>Buscando...</Card.Title>
               </Card.Root>
            </Animated.View>
         </VStack>
      )
   }
   return <ListEmptyComponent title={msgs[status]} />
}

const schema = z.object({
   codigo: z.string().min(3, "Código é obrigatório"),
});

type CupomForm = z.input<typeof schema>;

export function CarrinhoCupomDesconto() {
   const { carrinhoId, setCupom, cupom } = useCarrinho();
   const insets = useSafeAreaInsets();
   const { goBack } = useNavigation();
   const { control, handleSubmit, formState: { errors }
   } = useForm<CupomForm>({
      resolver: zodResolver(schema)
   });

   const handleCloseModal = useCallback(() => {
      const time = setTimeout(() => goBack(), 2000);
      return () => clearTimeout(time);
   }, []);

   const onSubmit = useMutation({
      mutationKey: ['handleAplicaCupom'],
      mutationFn: (form: CupomForm) => aplicaCupomDesconto(carrinhoId, form.codigo),
      onSuccess: async () => {
         const carrinho = await obtemCarrinho();
         if (carrinho?.cupom) {
            setCupom(carrinho?.cupom);
            handleCloseModal()
         }
      },
      onError() {
         setCupom({} as PayloadCupomAplicado)
      },
   });

   return (
      <Layout.Scroll contentContainerStyle={{ flexGrow: 1 }}>
         <HStack m="sm" justifyContent="flex-end">
            <Pressable
               onPress={goBack}>
               <Circle
                  variant="shadow"
                  width={30}
                  height={30}
                  marginVertical="sm"
                  justifyContent="center"
               >
                  <Icon.X />
               </Circle>
            </Pressable>
         </HStack>

         <VStack justifyContent='space-between' flex={1} mx='sm' >
            <VStack gap='md'>
               <InputText
                  inputMode='search'
                  onSubmitEditing={handleSubmit((data) => onSubmit.mutate(data))}
                  label="Cupom"
                  iconLeft={<Icon.Ticket size={24} />}
                  name='codigo'
                  placeholder='Digite o código do cupom'
                  control={control}
                  error={errors?.codigo?.message}
               />
            </VStack>

            <VStack flex={2}>
               {cupom.id ? <Sucesso data={cupom} /> : <Error status={onSubmit.status || 'idle'} />}
            </VStack>

            <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: insets.bottom + 8 }}>
               <Button
                  loading={onSubmit.isPending}
                  onPress={handleSubmit((data) => onSubmit.mutate(data))}>
                  Buscar
               </Button>
            </View>
         </VStack>
      </Layout.Scroll>
   )
}