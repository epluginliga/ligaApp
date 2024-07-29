import { Path, Svg } from "react-native-svg";
import { Icon } from ".";

export function IconArrowLeft({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}>
         <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" fill="transparent" />
      </Svg>
   );
}


export function IconArrowRight({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke={color}>
         <Path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </Svg>
   );
}


export function IconArrowDown({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 600 600" fill="none" >
         <Path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" fill={color} />
      </Svg>
   );
}

export function IconArrowPath({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}  fill="none">
         <Path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"  />
      </Svg>
   );
}

