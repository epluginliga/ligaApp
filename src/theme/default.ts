import { createTheme } from '@shopify/restyle';
import { buttonVariants } from './buttonVariants';

const palette = {
   primary: '#F23E17',
   secondary: '#F2385A',
   botao_default: 'rgba(242, 56, 90, 0.65)',

   azul: '#0001F8',
   purple: '#6400DD',
   purple_200: '#37007A',
   purple_300: 'rgba(55, 0, 122, 0.65)',

   greenLight: '#56DCBA',
   greenPrimary: '#0ECD9D',
   greenDark: '#0A906E',

   black: '##1F1F1F',
   white: '#FFFFFF',
   bege: '#E0E0E0',
   bege_200: '#C2C2C2',
   bege_900: '##868686',
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
      0: 0,
      xs: 2,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40,
      xl5: 120,
      full: '100%',
   },

   textVariants: {
      header: {
         color: "black",
         fontWeight: 'medium',
         fontSize: 22,
         fontFamily: "Poppins-SemiBold",
      },
      labelInput: {
         color: "primary",
         fontWeight: 'regular',
         fontSize: 16,
         fontFamily: "Poppins-Regular",
         margin: "0",
         padding: "0",
      },
      header2: {
         color: "black",
         fontWeight: "700",
         fontSize: 14,
         fontFamily: "Poppins-Bold",
      },
      header3: {
         color: "black",
         fontWeight: "300",
         fontSize: 12,
         fontFamily: "Poppins-Regular",
      },
      body: {
         color: "black",
         fontSize: 16,
         fontFamily: "Poppins-Regular",
      },
      defaults: {
         color: "black",
         fontFamily: "Poppins-Regular",
         fontSize: 20,
      },
      botaoLink: {
         fontSize: 14,
         fontFamily: "Poppins-Regular",
         margin: "0",
      }
   },
   card: {
      shadow: {
         shadowColor: "bege_900",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.25,
         shadowRadius: 20,
         elevation: 5,
      }
   },
   buttonVariants,

});

export type Theme = typeof theme;
export default theme;