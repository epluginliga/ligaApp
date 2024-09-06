import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/default";
import { Icon } from "../../icons";
import VStack from "../Views/Vstack";
import { Image, Pressable, PressableProps } from "react-native";
import React from "react";
import { StatusAprovacao } from "../../services/@perfil";
import Text from "../Text";

type colors = 'greenLight' | 'warning' | "bege_200" | "primary"
export const corStatusUsuario: { [key: string]: colors } = {
   'aguardando_aprovacao': 'warning',
   'aprovado': 'greenLight',
   'reprovado': "primary",
   'sem_imagem': "bege_200"
};

const textoStatus: { [key: string]: string } = {
   'aguardando_aprovacao': 'Aguardando aprovação',
   'aprovado': 'Aprovado',
   'reprovado': 'Reprovado',
   'sem_imagem': 'Sem Imagem'
};

export type AvatarUsuarioProps = PressableProps & {
   children?: React.ReactNode | React.ReactNode[];
   usuario?: {
      status_aprovacao?: StatusAprovacao;
      path_avatar?: string;
   }
}
export function AvatarUsuario({ children, usuario, ...rest }: AvatarUsuarioProps) {
   const { colors } = useTheme<Theme>();


   const corStatus = usuario?.status_aprovacao && corStatusUsuario[usuario?.status_aprovacao] || 'bege_200';

   const icone = {
      'aguardando_aprovacao': <Icon.Warning color={colors[corStatus]} />,
      'aprovado': <Icon.CheckCircle color={colors[corStatus]} />,
      'reprovado': <Icon.X color={colors[corStatus]} />,
      'sem_imagem': <Icon.Warning color={colors[corStatus]} />,
   }
   const iconeStatus = usuario?.status_aprovacao && icone[usuario?.status_aprovacao];

   return (
      <Pressable {...rest}>
         <VStack
            justifyContent='center'
            alignItems='center'
            mb='lg'
            mx='sm'
            gap='xs'
         >
            <VStack
               borderRadius={100}
               backgroundColor={corStatus}
               width={100}
               height={100}
               mb='sm'
               justifyContent='center'
               alignItems='center'
               position='relative'>
               
               {usuario?.path_avatar && (
                  <Image
                     style={{ height: 90, width: 90, borderRadius: 100 }}
                     source={{ uri: usuario?.path_avatar }}
                  />
               )}

               <VStack
                  position='absolute'
                  bottom={0}
                  left="75%"
                  backgroundColor='white'
                  borderRadius={100}
                  p='xs'
               >
                  {iconeStatus ? iconeStatus : <Icon.Warning />}
               </VStack>
            </VStack>

            {usuario?.status_aprovacao && (
               <Text variant='header2' color={corStatus}>{textoStatus[usuario.status_aprovacao]}</Text>
            )}

            {children && (
               <VStack mt="sm">{children}</VStack>
            )}
         </VStack>
      </Pressable>
   )
}
