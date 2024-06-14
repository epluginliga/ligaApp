import { FlatList, TextInput } from "react-native";
import { useState } from "react";
import { Control } from "react-hook-form";

import { ModalApp } from "../../components/Modal";
import HStack from "../../components/Views/Hstack";
import { Input } from "../../components/Inputs";
import Text from "../../components/Text";
import VStack from "../../components/Views/Vstack";

import { InputSelecionar } from "../../components/Inputs/Selecionar";
import { FormUtilizador } from "./CarrinhoUtilizador";
import theme, { Theme } from "../../theme/default";
import { PayloadEventoAtletica } from "../../services/@eventos";
import { useTheme } from "@shopify/restyle";
import { Icon } from "../../icons";

type AtleticaProps = {
   control: Control<FormUtilizador>;
   name: string;
   error?: string;
   setValue: (val: string) => void;
   data: PayloadEventoAtletica[]
};

export function CarrinhoUtilizadorAtletica({ control: controlForm, data, ...rest }: AtleticaProps) {
   const [itemSelecionado, setItemSelecionado] = useState({ id: null, label: null, name: null });
   const [search, setSearch] = useState("");
   const { colors } = useTheme<Theme>();

   if (!data) {
      return;
   }

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
                  <Input>
                     <TextInput
                        placeholder="Digite o nome da atlética..."
                        placeholderTextColor={colors.bege_900}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        style={{
                           fontSize: theme.spacing.md,
                           fontFamily: theme.fonts.medium,
                           flex: 1,
                           color: theme.colors.black,
                        }}
                        {...rest}
                     />

                  </Input>
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