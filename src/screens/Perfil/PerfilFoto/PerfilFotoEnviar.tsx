import React, { useContext } from 'react'
import { z } from "zod";
import { CameraApp } from '../../../components/Camera';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/Button';
import VStack from '../../../components/Views/Vstack';
import { StepsContext } from '.';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { Icon } from '../../../icons';

const schema = z.object({
   foto: z.string(),
});

export function PerfilFotoEnviar() {
   const { backStep } = useContext(StepsContext);
   const insets = useSafeAreaInsets();

   const { control, handleSubmit, formState: { errors }, getValues
   } = useForm<any>({
      resolver: zodResolver(schema),
   });


   return (
      <Animated.View
         entering={FadeInRight}
         exiting={FadeOutRight}
         style={[{ flex: 1 }]}
      >
         <CameraApp flex={1} justifyContent='flex-end'>
            <View style={{ bottom: insets.bottom + 16 }} >
               <Button iconRight={false} iconLeft={<Icon.ArrowLeft color='#fff' />} onPress={backStep}>Voltar</Button>
            </View>
         </CameraApp>
      </Animated.View>
   )
}