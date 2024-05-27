import { createTheme } from '@shopify/restyle';
import { buttonVariants } from './buttonVariants';
import { textVariants } from './textVariants';
import { card } from './cardVariants';

const palette = {
   primary: '#F23E17',
   secondary: '#F2385A',
   botao_default: 'rgba(242, 56, 90, 0.65)',
   background_red_tab: 'rgba(242, 56, 90, 0.10)',


   azul: '#0001F8',
   purple: '#6400DD',
   purple_200: '#37007A',
   purple_300: 'rgba(55, 0, 122, 0.65)',
   purple_100: 'rgba(62, 19, 113, 0.32)',

   greenLight: '#56DCBA',
   greenPrimary: '#0ECD9D',
   greenDark: '#0A906E',

   black: '#1F1F1F',
   white: '#FFFFFF',
   bege: '#F7F7F7',
   bege_200: '#C2C2C2',
   bege_900: '#868686',
};

const theme = createTheme({
   fonts: {
      medium: 'Poppins-Regular'
   },
   colors: {
      ...palette,
      mainBackground: palette.white,
      cardPrimaryBackground: palette.bege,
      buttonPrimaryBackground: palette.primary,
   },
   spacing: {
      none: 0,
      xs: 2,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40,
      xl5: 120,
      full: '100%',
   },
   textVariants,
   card,
   buttonVariants,
   HStack: {
      shadow: {
         shadowColor: "bege_900",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 1,
         shadowRadius: 20,
         elevation: 10,
      },
      defaults: {}
   },
   VStack: {
      shadow: {
         shadowColor: "bege_900",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 1,
         shadowRadius: 20,
         elevation: 10,
      },
      defaults: {}
   },
   Circle: {
      shadow: {
         shadowColor: "bege_900",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 1,
         shadowRadius: 20,
         elevation: 10,
         borderColor: "bege_200",
         // borderWidth: 1
      },
      defaults: {
         borderRadius: 100,
         backgroundColor: 'white',
         alignItems: "center"
      }
   }

});

export type Theme = typeof theme;
export default theme;