import React, { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { FlatList, Pressable, TextInput } from 'react-native'

import { Input, InputDefault } from '.'
import HStack from '../Views/Hstack'
import Text from '../Text'
import { Icon } from '../../icons'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import VStack from '../Views/Vstack'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../theme/default'
import { HandleModalApp, ModalApp } from '../Modal'

type InputText = InputDefault & {
   name: string;
   control: any;
   label?: string;
   option: {
      name: string;
      label: string;
   }[]
}

export function InputSelecionar({ name, label, option, ...rest }: InputText) {
   const { colors, spacing, fonts } = useTheme<Theme>();
   const [search, setSearch] = useState("");
   const modalRef = useRef<HandleModalApp>(null);

   const dadosFiltrados = option?.filter((item) =>
      item?.name?.toLowerCase()?.includes(search.toLowerCase())
   );

   return (
      <Controller
         name={name}
         rules={{ required: true }}
         control={rest.control}
         render={({ field: { onChange, value } }) => {
            return (
               <ModalApp
                  ref={modalRef}
                  handleOpen={(
                     <Input label={label} error={rest.error}>
                        <HStack alignItems='center' justifyContent='space-between' width="100%">
                           <HStack alignItems='center'>
                              {value && <Icon.CheckCircle color="#0A906E" />}
                              <Text color='bege_900' fontSize={16}>
                                 {value ? value : rest.placeholder ? rest.placeholder : "Selecione.."}
                              </Text>
                           </HStack>
                           <Icon.Down />
                        </HStack>
                     </Input>
                  )}>
                  <FlatList
                     keyExtractor={(item) => item.name}
                     stickyHeaderHiddenOnScroll={false}
                     stickyHeaderIndices={[0]}
                     showsVerticalScrollIndicator={false}
                     data={dadosFiltrados}
                     ListHeaderComponent={(
                        <VStack marginBottom='sm' flex={1} gap='md' >
                           <Input>
                              <TextInput
                                 placeholder="Digite o nome..."
                                 placeholderTextColor={colors.bege_900}
                                 onChangeText={(text) => setSearch(text)}
                                 value={search}
                                 style={{
                                    fontSize: spacing.md,
                                    fontFamily: fonts.medium,
                                    flex: 1,
                                    color: colors.black,
                                 }}
                                 {...rest}
                              />
                           </Input>
                        </VStack>
                     )}
                     ItemSeparatorComponent={() => <HStack borderBottomColor='bege' opacity={0.1} borderWidth={1} />}
                     initialNumToRender={10}
                     renderItem={({ item }) => (
                        <Pressable onPress={() => {
                           onChange(item.name);
                           modalRef.current?.close();
                        }}>
                           <HStack padding='sm' justifyContent='space-between'>
                              <Text variant='body'>{item.label}</Text>
                              {value === item.name && (
                                 <Animated.View
                                    entering={FadeInRight}
                                    exiting={FadeOutRight}>
                                    <Icon.CheckCircle />
                                 </Animated.View>
                              )}
                           </HStack>
                        </Pressable>
                     )}
                  />
               </ModalApp>
            )
         }}
      />
   )
}

