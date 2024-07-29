import { UseMutationResult } from "@tanstack/react-query";
import { LoginProps, UserProps } from "../services/auth";

export type UserAuthDados = {
   id: string;
   nome: string;
   documento: string;
}

export type UpdateUsuarioProps = {
   id?: string;
   nome: string;
}
export interface AuthContextProps {
   handleSignIn: UseMutationResult<UserProps, Error, LoginProps, unknown>
   token: string;
   logado: boolean;
   loading: boolean;
   signOut: () => void;
   user: UserAuthDados;
   updateUsuario: (dados: UpdateUsuarioProps) => void;
}
export interface AuthProviderProps {
   children: React.ReactNode;
}
