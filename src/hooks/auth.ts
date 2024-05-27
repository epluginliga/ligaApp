import React, { createContext, useCallback, useState } from "react";
import { UserProps } from "../services/auth";

type AuthProps = {
   user: UserProps;
}
type AuthProviderProps = {
   children: React.ReactNode;
   handleSign: (user: string, password: string) => string;
}

const AuthContext = createContext<AuthProps>({} as AuthProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState<UserProps>({} as UserProps);

   const handleSignIn = useCallback(() => { }, []);

   const handleSignOut = useCallback(() => { }, []);

}

