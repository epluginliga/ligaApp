import { createTheme } from '@shopify/restyle';

const palette = {
   primary: '#F23E17',
   secondary: "#F2385A",
   azul: '#0001F8',
   purple: '#6400DD',

   greenLight: '#56DCBA',
   greenPrimary: '#0ECD9D',
   greenDark: '#0A906E',

   black: '#191919',
   white: '#FFFFFF',
   bege: '#E0E0E0',
};

const theme = createTheme({
   colors: {
      ...palette,
      mainBackground: palette.white,
      cardPrimaryBackground: palette.bege,
      buttonPrimaryBackground: palette.primary,
   },
   spacing: {
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
   },
   textVariants: {
      header: {
         fontWeight: 'bold',
         fontSize: 18,
         fontFamily: "Poppins-SemiBold",
      },
      body: {
         fontSize: 16,
         fontFamily: "Poppins-Regular",
      },
      defaults: {
         fontFamily: "Poppins-Regular",
         fontSize: 20,
      },
   },
});

export type Theme = typeof theme;
export default theme;