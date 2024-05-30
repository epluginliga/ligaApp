import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';

import { login, LoginProps, UserProps } from '../services/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'

interface AuthContextProps {
   handleSignIn: (data: LoginProps, redirect?: string) => void;
   token: string;
   logado: boolean;
   loading: boolean;
   signOut: () => void
}
interface AuthProviderProps {
   children: React.ReactNode;
}

export const KEY_REDIRECT = '@redirect';

export const usuarioStorage = new MMKV()

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
   const [token, setToken] = useState('');
   const [loading, setLoading] = useState(true);
   const navigate = useNavigation();

   const handleSignIn = useMutation({
      mutationKey: ['handleLogin'],
      mutationFn: (data: LoginProps) => login(data),
      async onSuccess(data) {
         try {
            usuarioStorage.set('token', data.api_token);
            setToken(data.api_token);
         } catch (e) {

         }
      },
   });

   const signOut = useCallback(() => {
      usuarioStorage.clearAll();
      setToken('');
   }, []);

   useEffect(() => {
      const obtemUsuario = () => {
         try {
            let token = usuarioStorage.getString('token');
            if (!!token) {
               setToken(token);
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
            token,
            logado: !!token,
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
