import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { Icon } from '../../icons';
import Share, { ShareOptions } from 'react-native-share';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/default';

export type ButtonShareProps = ShareOptions & {}

export const ButtonShare = ({ ...rest }: ButtonShareProps) => {
   const [loading, setLoading] = useState(false);
   const { colors } = useTheme<Theme>();

   const handleShare = useCallback(async () => {
      setLoading(true)
      await Share.open(rest)
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            err && console.log(err);
         });

      setLoading(false)
   }, [])

   return (
      <Pressable onPress={() => handleShare()}>
         {loading ? <ActivityIndicator size="small" color={colors.primary} /> : <Icon.Share />}
      </Pressable>
   )
};