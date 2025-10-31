import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Text from '../Text';

type Html = {
   source: string;
   size?: number;
}


export function Html({ source, size }: Html) {
   if (!source) return '';
   let s = source.replace(/<\s*p\s*\/?>/gi, '\n').replace(/<\/\s*p\s*>/gi, '\n');
   // Remove any other HTML tags
   s = s.replace(/<[^>]+>/g, '');
   // Decode common HTML entities
   s = s
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
   // Normalize newlines and trim
   s = s.replace(/\r\n|\r/g, '\n').replace(/\n{2,}/g, '\n\n').trim();
   return (
      <Text variant='body'>{s}</Text>
   )
   // return (
   //    <RenderHtml
   //       systemFonts={["Poppins-Regular"]}
   //       ignoredDomTags={["br"]}
   //       tagsStyles={{
   //          h3: {
   //             marginBottom: 0,
   //             fontSize: "18px",
   //             color: "#1F1F1F",
   //          },
   //          body: {
   //             color: "#1F1F1F",
   //          },
   //          h5: {
   //             fontSize: "15px",
   //             marginBottom: 0,
   //             color: "#1F1F1F",
   //          }
   //       }}
   //       enableCSSInlineProcessing
   //       contentWidth={size || width}
   //       source={{ html: source }}
   //    />
   // );
}