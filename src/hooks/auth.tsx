import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { login, LoginProps, UserProps } from '../services/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RouteApp } from '../@types/navigation';


interface AuthContextProps {
   handleSignIn: (data: LoginProps, redirect?: string) => void;
   usuario: UserProps;
   logado: boolean;
   loading: boolean;
}
interface AuthProviderProps {
   children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
   const [usuario, setUsuario] = useState<UserProps>({} as UserProps);
   const [loading, setLoading] = useState(false);
   const [logado, setLogado] = useState(false);
   const { navigate } = useNavigation();

   const handleSignIn = useCallback(async (data: LoginProps, redirect = '') => {
      setLoading(true);
      const usuarioResposta = await login(data);
      setUsuario(usuarioResposta);
      setLoading(false);
      setLogado(true);

      if (redirect) {
         console.log("", redirect);
      }
   }, []);

   const signOut = useCallback(async () => {

   }, []);

   return (
      <AuthContext.Provider
         value={{
            handleSignIn,
            usuario,
            logado,
            loading,
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
