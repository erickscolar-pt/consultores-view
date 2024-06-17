import { createContext, ReactNode } from 'react';
import { api } from '../services/apiCliente';

type AuthContextData = {
  handler: (credentials: ExemploProps) => Promise<void>;
}


type ExemploProps = {
  req: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContexts = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){

  async function handler({ req }:ExemploProps) {
    try {
      const res = await api.post('/webhook', { Body: req });
      console.log('res..::'+res)
    } catch (error) {
      console.error(error);
    }
  }


  return(
    <AuthContexts.Provider value={{ handler }}>
      {children}
    </AuthContexts.Provider>
  )
}