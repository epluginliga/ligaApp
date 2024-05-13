import { Path, Svg } from "react-native-svg";
import { Icon } from ".";

export function IconArrowLeft({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 600 600" fill="none" >
         <Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill={color} />
      </Svg>
   );
}

export function IconArrowRight({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 600 600" fill="none" >
         <Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill={color} />
      </Svg>
   );
}

