import { createContext, ReactNode, useState } from "react";
import { api } from "../services/apiClient";
import { Cliente, Projeto, Tarefa } from "@/model/types";
import { destroyCookie, setCookie } from "nookies";
import { toast } from "react-toastify";
import Router from "next/router";

type AuthContextData = {
  usuario: UsuarioProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UsuarioProps = {
  id: number;
  name: string;
  email: string;
  token: string;
  role: string;
  confirmMail: boolean;
};

type SignInProps = {
  username: string;
  password: string;
};

export const AuthContexts = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.consultores.token');
    Router.push('/');
  } catch {
    console.error('Erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioProps>();

  const isAuthenticated = !!usuario;

  async function signIn({ username, password }: SignInProps) {
    try {
      const response = await api.post("/auth/signin", {
        username,
        password,
      });

      const { id, name, email, token, role, confirmMail } = response.data;

      if (window) {
        sessionStorage.setItem("token", response.data.token);
      }

      setUsuario({
        id,
        name,
        email,
        token,
        role,
        confirmMail,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      if (role) {
        setCookie(undefined, "@nextauth.consultores.token", token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        Router.push({ pathname: "/chat" });
        toast.success("Bem vindo à administração do sistema.");
        return;
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw new Error("Failed to sign in");
    }
  }

  return (
    <AuthContexts.Provider
      value={{
        usuario,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContexts.Provider>
  );
}
