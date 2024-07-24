import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import { Icon } from '../../icons';
import Share, { ShareOptions } from 'react-native-share';

export type ButtonShareProps = ShareOptions & {

}

export const ButtonShare = ({ ...rest }: ButtonShareProps) => {

   const handleShare = useCallback(async () => {

      await Share.open(rest)
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            err && console.log(err);
         });
   }, [])

   return (
      <Pressable onPress={() => handleShare()}>
         <Icon.Share />
      </Pressable>
   )
}