import { IconEye, IconEyeSlash } from "./IconEye";
import { IconArrowLeft, IconArrowRight } from "./IconArrow";
import { IconHome } from "./IconHome";
import { IconCalendario } from "./IconCalendario";
import { IconPin } from "./IconPin";
import { IconUser } from "./IconUsers";
import { IconEnvelope } from "./IconEnvelope";
import { IconClock } from "./IconClock";

export const Icon = {
   Eye: IconEye,
   EyeSlash: IconEyeSlash,
   ArrowLeft: IconArrowLeft,
   ArrowRight: IconArrowRight,
   Home: IconHome,
   Calendario: IconCalendario,
   Pin: IconPin,
   User: IconUser,
   Envelope: IconEnvelope,
   Clock: IconClock,
}

export type Icon = {
   size?: number;
   color?: string;
}

