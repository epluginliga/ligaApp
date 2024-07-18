import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';

import { login, LoginProps, UserProps } from '../services/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv'
import api from '../services';
interface AuthContextProps {
   handleSignIn: UseMutationResult<UserProps, Error, LoginProps, unknown>
   token: string;
   logado: boolean;
   loading: boolean;
   signOut: () => void;
   user_id: string;
}
interface AuthProviderProps {
   children: React.ReactNode;
}

export const usuarioStorage = new MMKV()
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
   const [token, setToken] = useState('');
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState('');

   const handleSignIn = useMutation({
      mutationKey: ['handleLogin'],
      mutationFn: (data: LoginProps) => login(data),
      onSuccess(data) {
         if (!data) {
            throw new Error("Dados inválidos!");
         }

         usuarioStorage.set('token', data.api_token);
         usuarioStorage.set('user_id', data.user_id);

         api.defaults.headers.Authorization = data.api_token;
         setToken(data.api_token);
         setUser(data.user_id)
      },
   });

   const signOut = useCallback(() => {
      usuarioStorage.clearAll();
      setToken('');
      setUser('');
      delete api.defaults.headers.Authorization;
   }, []);

   useEffect(() => {
      let token = usuarioStorage.getString('token');
      const user_id = usuarioStorage.getString('user_id');

      if (token && user_id) {
         api.defaults.headers.Authorization = token;
         setToken(token);
         setUser(user_id);
      }

      setLoading(false)

   }, []);

   return (
      <AuthContext.Provider
         value={{
            handleSignIn,
            token,
            logado: !!token,
            loading: handleSignIn.isPending || loading,
            signOut,
            user_id: user
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
