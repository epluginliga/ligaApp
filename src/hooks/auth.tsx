import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';

import { login, LoginProps, UserProps } from '../services/auth';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RouteApp } from '../@types/navigation';

interface AuthContextProps {
   handleSignIn: (data: LoginProps, redirect?: string) => void;
   usuario: UserProps | null | undefined;
   logado: boolean;
   loading: boolean;
   signOut: () => void
}
interface AuthProviderProps {
   children: React.ReactNode;
   redirect?: RouteProp<RouteApp, 'Eventos'>;
}

const KEY_AUTH = '@auth';
export const KEY_REDIRECT = '@redirect';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


function AuthProvider({ children, redirect }: AuthProviderProps): React.ReactElement {
   const [usuario, setUsuario] = useState<UserProps | null>();
   const [loading, setLoading] = useState(true);
   const navigate = useNavigation();

   const handleSignIn = useMutation({
      mutationKey: ['handleLogin'],
      mutationFn: (data: LoginProps) => login(data),
      async onSuccess(data) {
         try {
            await AsyncStorage.setItem(KEY_AUTH, JSON.stringify(data));
            setUsuario(data);
         } catch (e) {

         }
      },
   });

   const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove([KEY_AUTH, KEY_REDIRECT]);
      setUsuario(null);
      navigate.navigate("Eventos")
   }, []);

   useEffect(() => {
      const obtemUsuario = async () => {
         try {
            let usuario = await AsyncStorage.getItem(KEY_AUTH);
            if (!!usuario) {
               setUsuario(JSON.parse(usuario));
            }

         } catch (e) {
            // saving error
         } finally {
            setLoading(false);
         }
      }

      obtemUsuario();
   }, [])

   return (
      <AuthContext.Provider
         value={{
            handleSignIn: (data) => handleSignIn.mutate(data),
            usuario,
            logado: !!usuario,
            loading: handleSignIn.isPending || loading,
            signOut
         }}>
         {children}
      </AuthContext.Provider>
   );
};

function useAuth(): AuthContextProps {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }

   return context;
}

export { AuthProvider, useAuth };
