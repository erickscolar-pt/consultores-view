import { AuthContexts } from "@/contexts/AuthContexts";
import { setupAPIClient } from "@/services/api";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { FormEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import pigImage from "../../public/icon-pig.png";
import Image from "next/image";
import Link from "next/link";

type loginFormProps = {
  email: string;
  senha: string;
};

export default function Home() {
  const { signIn } = useContext(AuthContexts);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (username === "" || password === "") {
      toast.warning("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    let data = {
      username,
      password,
    };
    await signIn(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo: Formulário de Login */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Consultor</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
                })}
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Digite seu email"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                {...register("senha", {
                  required: "Campo obrigatório",
                  minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                })}
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.senha.message)}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded hover:bg-green-400"
            >
              Entrar
            </button>
            <div className="mt-4 text-center">
              <Link href="/cadastro" className="text-primary hover:underline">
                Não tem uma conta? Cadastre-se aqui.
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Lado Direito: Logo da ContaPlus */}
      <div className="hidden md:flex w-1/2 bg-colorLogo items-center justify-center">
        <div className="text-white text-center">
          <Image
            src={pigImage}
            alt="Logo da Conta Plus"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  return {
    props: {},
  };
});