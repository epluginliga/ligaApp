import { Control, useForm } from "react-hook-form";
import { useCarrinho } from "../../hooks/carrinho";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { fetchEventoAtleticas } from "../../services/eventos";
import { ModalApp } from "../../components/Modal";
import { Icon } from "../../icons";
import HStack from "../../components/Views/Hstack";
import { FlatList } from "react-native";
import { Input } from "../../components/Inputs";
import Text from "../../components/Text";
import VStack from "../../components/Views/Vstack";
import { InputText } from "../../components/Inputs/Text";
import { InputSelecionar } from "../../components/Inputs/Selecionar";
import { FormUtilizador } from "./CarrinhoUtilizador";

type AtleticaProps = {
   control: Control<FormUtilizador>;
   name: string;
   error?: string;
};

const schema = z.object({
   search: z.string()
});
type Form = z.input<typeof schema>;

export function CarrinhoUtilizadorAtletica({ control: controlForm, ...rest }: AtleticaProps) {
   const { evento } = useCarrinho();
   const [itemSelecionado, setItemSelecionado] = useState({ id: null, label: null, name: null });

   const { control, formState: { errors }, watch } = useForm<Form>({
      resolver: zodResolver(schema),
      defaultValues: {
         search: ''
      }
   });

   if (!evento?.id) {
      return;
   }

   const { isLoading, data } = useQuery({
      queryKey: ['fetchEventoAtleticas', evento?.id],
      queryFn: () => fetchEventoAtleticas(evento.id),
      enabled: !!evento?.id,
   });

   if (isLoading || !data) {
      return;
   }
   const { search } = watch();

   const dadosFiltrados = data?.filter((item) =>
      item?.slug?.toLowerCase()?.includes(search.toLowerCase())
   );

   return (
      <ModalApp handleOpen={(
         <Input error={rest.error}>
            <HStack alignItems='center' justifyContent='space-between' width="100%">
               <HStack alignItems='center'>
                  {itemSelecionado.label && <Icon.CheckCircle color="#0A906E" />}
                  <Text>
                     {itemSelecionado.label ? itemSelecionado.label : "Selecione uma atlética"}
                  </Text>
               </HStack>
               <Icon.Down />
            </HStack>
         </Input>
      )}>
         <FlatList
            stickyHeaderHiddenOnScroll={false}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            data={dadosFiltrados}
            ListHeaderComponent={(
               <VStack marginBottom='sm' flex={1} gap='md' >
                  <InputText
                     placeholder='Selecione a atlética'
                     control={control}
                     name='search'
                     error={errors?.search?.message}
                  />
               </VStack>
            )}
            ItemSeparatorComponent={() => <HStack borderBottomColor='bege' opacity={0.1} borderWidth={1} />}
            initialNumToRender={10}
            renderItem={({ item }) => (
               <InputSelecionar
                  callback={setItemSelecionado}
                  id={item.slug}
                  control={controlForm}
                  label={item.nome}
                  {...rest}
               />
            )}
         />
      </ModalApp >
   );
}