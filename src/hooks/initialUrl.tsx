import { useEffect, useState } from "react";
import { Linking } from "react-native";

export const useInitialURL = () => {
   const [url, setUrl] = useState<string | null>(null);

   useEffect(() => {
      const getUrlAsync = async () => {
         const initialUrl = await Linking.getInitialURL();
         setUrl(initialUrl);
      };

      getUrlAsync();
   }, []);

   return { url };
};
