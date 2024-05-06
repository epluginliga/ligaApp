import { createTheme } from '@shopify/restyle';

const palette = {
   primary: '#F23E17',
   secondary: "#F2385A",
   azul: '#0001F8',
   purple: '#6400DD',
   purple_200: '#37007A',

   greenLight: '#56DCBA',
   greenPrimary: '#0ECD9D',
   greenDark: '#0A906E',

   black: '##1F1F1F',
   white: '#FFFFFF',
   bege: '#E0E0E0',
   bege_200: '#C2C2C2',
};

const theme = createTheme({
   colors: {
      ...palette,
      mainBackground: palette.white,
      cardPrimaryBackground: palette.bege,
      buttonPrimaryBackground: palette.primary,
   },
   spacing: {
      xs: 2,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40,
   },
   textVariants: {
      header: {
         color: "black",
         fontWeight: 'medium',
         lineHeight: 26,
         fontSize: 24,
         fontFamily: "Poppins-SemiBold",
      },
      header2: {
         color: "black",
         fontWeight: 700,
         lineHeight: 15,
         fontSize: 14,
         fontFamily: "Poppins-Bold",
      },
      header3: {
         color: "black",
         fontWeight: 300,
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
   },
   card: {
      shadow: {
         shadowColor: "bege_200",
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.25,
         shadowRadius: 20,
         elevation: 5,
      }
   }
});

export type Theme = typeof theme;
export default theme;