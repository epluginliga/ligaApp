import React from 'react';
import Text from '../Text';
import { TextProps } from '@shopify/restyle';
import { Theme } from '../../theme/default';

type Section = TextProps<Theme> & {
   children: string | React.ReactNode,
}
export function SectionTitle({ children, ...props }: Section) {
   return <Text variant='header'  {...props}>{children}</Text>
}
