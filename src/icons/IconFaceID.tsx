

import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '.'


export function IconFaceID({ size = 24, color = "#F2385A" }: Icon) {

   return (
      <Svg width={size} height={size} viewBox={`0 0 40 40`} fill="none" strokeWidth={1.5} stroke={color} >
         <Path
            d='M16.143 22.184a3.185 3.185 0 003.181-3.181v-6.127a.825.825 0 10-1.649 0v6.127c0 .845-.687 1.532-1.532 1.532a.825.825 0 000 1.65zM9.25 13.467v2.357a1.002 1.002 0 002.003 0v-2.357a1.002 1.002 0 00-2.003 0zM26.748 16.826c.553 0 1.001-.449 1.001-1.002v-2.356a1.002 1.002 0 00-2.003 0v2.356c0 .553.449 1.002 1.002 1.002zM25.565 26.27a.824.824 0 00-1.161-.107 9.596 9.596 0 01-12.265 0 .825.825 0 00-1.054 1.269 11.221 11.221 0 007.187 2.596c2.552 0 5.105-.866 7.187-2.596a.825.825 0 00.106-1.162zM.825 13.434c.456 0 .825-.37.825-.825V8.491a6.848 6.848 0 016.84-6.84h4.118a.825.825 0 100-1.65H8.49C3.809.002 0 3.812 0 8.492v4.119c0 .455.37.824.825.824zM36.175 23.567a.825.825 0 00-.825.825v4.118a6.848 6.848 0 01-6.84 6.84h-4.118a.825.825 0 100 1.65h4.118C33.192 37 37 33.19 37 28.51v-4.118a.825.825 0 00-.825-.825zM12.608 35.35H8.49a6.848 6.848 0 01-6.84-6.84v-4.118a.825.825 0 10-1.65 0v4.118C0 33.191 3.81 37 8.49 37h4.119a.825.825 0 100-1.65zM28.51 0h-4.118a.825.825 0 100 1.65h4.118a6.848 6.848 0 016.84 6.84v4.118a.825.825 0 101.65 0V8.49C37 3.81 33.19 0 28.51 0z'
            fill={color}
         />
      </Svg>
   )
}

