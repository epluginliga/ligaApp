import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

type Html = {
   source: string;
   size?: number;
}


export function Html({ source, size }: Html) {
   const { width } = useWindowDimensions();
   return (
      <RenderHtml
         systemFonts={["Poppins-Regular"]}
         ignoredDomTags={["br"]}
         tagsStyles={{
            h3: {
               marginBottom: 0,
               fontSize: "18px",
            },
            h5: {
               fontSize: "15px",
               marginBottom: 0,
            }
         }}
         contentWidth={size || width}
         source={{ html: source }}
      />
   );
}