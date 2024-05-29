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

   const handleSignIn = useMutation({
      mutationKey: ['handleLogin'],
      mutationFn: (data: LoginProps) => {
         return login(data)
      },
      onSuccess(data) {
         setUsuario(data)
      },
   });

   const signOut = useCallback(async () => {

   }, []);

   return (
      <AuthContext.Provider
         value={{
            handleSignIn: (data) => handleSignIn.mutate(data),
            usuario,
            logado: !!handleSignIn.data?.api_token,
            loading: handleSignIn.isPending,
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
