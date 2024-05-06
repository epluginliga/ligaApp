import React from 'react'
import Text from '../Text'
import { TextProps } from '@shopify/restyle'
import { Theme } from '../../theme/default'

export type CardTitle = TextProps<Theme> & {
   children: React.ReactNode
}

export function CardTitle({ children, ...rest }: CardTitle) {
   return (<Text variant='header'  {...rest}>{children}</Text>)
}
