import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';

import { login, LoginProps } from '../services/auth';
import { useMutation } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv'
import api from '../services';
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

export const usuarioStorage = new MMKV()
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
   const [token, setToken] = useState('');
   const [loading, setLoading] = useState(true);

   const handleSignIn = useMutation({
      mutationKey: ['handleLogin'],
      mutationFn: (data: LoginProps) => login(data),
      async onSuccess(data) {
         try {
            usuarioStorage.set('token', data.api_token);
            api.defaults.headers.Authorization = data.api_token;
            setToken(data.api_token);
         } catch (e) {

         }
      },
   });

   const signOut = useCallback(() => {
      usuarioStorage.clearAll();
      setToken('');
      delete api.defaults.headers.Authorization;
   }, []);

   useEffect(() => {
      let token = usuarioStorage.getString('token');
      if (token) {
         api.defaults.headers.Authorization = token;
         setToken(token);
      }
      setLoading(false)

   }, []);

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
