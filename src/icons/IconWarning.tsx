import { Path, Svg } from "react-native-svg";
import { Icon } from ".";

export function IconWarning({ size = 21, color = "#F2385A" }: Icon) {
   return (
      <Svg width={size} height={size} viewBox="0 0 512 512" fill="none" >
         <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" fill={color} />
      </Svg>
   )
}