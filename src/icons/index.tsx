import { IconEye, IconEyeSlash } from "./IconEye";
import { IconArrowDown, IconArrowLeft, IconArrowRight } from "./IconArrow";
import { IconHome } from "./IconHome";
import { IconCalendario } from "./IconCalendario";
import { IconPin } from "./IconPin";
import { IconUser } from "./IconUsers";
import { IconEnvelope, IconEnvelopeSolid } from "./IconEnvelope";
import { IconClock } from "./IconClock";
import { IconAddressCard } from "./IconAddressCard";
import { IconPhoneFlipe, IconPhoneFlipeSolid } from "./IconPhoneFlipe";
import { IconVenusMars } from "./IconVenusMars";
import { IconShare } from "./IconShare";
import { IconMinus } from "./IconMinus";
import { IconPlus } from "./IconPlus";
import { IconCheckCircle } from "./IconCheckCircle";
import { IconSearch } from "./IconSearch";
import { IconX } from "./IconX";

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
   EnvelopeSolid: IconEnvelopeSolid,
   Clock: IconClock,
   AddressCard: IconAddressCard,
   PhoneFlipe: IconPhoneFlipe,
   PhoneFlipeSolid: IconPhoneFlipeSolid,
   VenusMars: IconVenusMars,
   Share: IconShare,
   Minus: IconMinus,
   Plus: IconPlus,
   CheckCircle: IconCheckCircle,
   Search: IconSearch,
   Down: IconArrowDown,
   X: IconX,
}

export type Icon = {
   size?: number;
   color?: string;
}

