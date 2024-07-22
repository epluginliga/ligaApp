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

export type UserAuthDados = {
   id: string;
   nome: string;
}

interface AuthContextProps {
   handleSignIn: UseMutationResult<UserProps, Error, LoginProps, unknown>
   token: string;
   logado: boolean;
   loading: boolean;
   signOut: () => void;
   user?: UserAuthDados;
}
interface AuthProviderProps {
   children: React.ReactNode;
}

export const usuarioStorage = new MMKV()
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);



function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
   const [token, setToken] = useState('');
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState({} as UserAuthDados);

   const handleSignIn = useMutation({
      mutationKey: ['handleLogin'],
      mutationFn: (data: LoginProps) => login(data),
      onSuccess(data) {
         console.log(JSON.stringify(data, null, 1));

         if (!data) {
            throw new Error("Dados inválidos!");
         }

         const dadosUsuario = {
            id: data.user_id,
            nome: data.name
         };

         usuarioStorage.set('token', data.api_token);
         usuarioStorage.set('user_id', JSON.stringify(dadosUsuario));

         api.defaults.headers.Authorization = data.api_token;
         setToken(data.api_token);
         setUser(dadosUsuario)
      },
   });

   const signOut = useCallback(() => {
      usuarioStorage.clearAll();
      setToken('');
      setUser({} as UserAuthDados);
      delete api.defaults.headers.Authorization;
   }, []);

   useEffect(() => {
      let token = usuarioStorage.getString('token');
      let user = usuarioStorage.getString('user_id');

      if (token && user) {
         api.defaults.headers.Authorization = token;
         setToken(token);
         setUser(JSON.parse(user));
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
            user
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
