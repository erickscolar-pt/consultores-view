// pages/cadastro.js
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
    toast.success("Cadastro realizado com sucesso!");
  };

  const validateStep = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await trigger(["nome", "email", "senha"]);
        break;
      case 2:
        isValid = await trigger(["cpfCnpj", "telefone"]);
        break;
      default:
        isValid = true;
    }

    return isValid;
  };

  async function nextStep() {
    const isValid = await validateStep();

    if (isValid) {
      setStep(step + 1);
    } else {
      toast.error(
        "Por favor, preencha todos os campos obrigatórios corretamente."
      );
    }
  }

  const prevStep = () => setStep(step - 1);
  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo: Formulário de Cadastro */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Cadastro de Consultores
          </h1>

          <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="h-full flex flex-col between">
                <h2 className="text-xl font-semibold mb-4">
                  Informações Pessoais
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    {...register("nome", { required: "Campo obrigatório" })}
                    type="text"
                    className="w-full p-2 border rounded"
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.nome.message)}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Campo obrigatório",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email inválido",
                      },
                    })}
                    type="email"
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Senha
                  </label>
                  <input
                    {...register("senha", {
                      required: "Campo obrigatório",
                      minLength: {
                        value: 6,
                        message: "Mínimo de 6 caracteres",
                      },
                    })}
                    type="password"
                    className="w-full p-2 border rounded"
                  />
                  {errors.senha && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.senha.message)}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-6/12 bg-primary text-white p-2 rounded hover:bg-white hover:text-primary hover:border hover:border-primary ml-2"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="h-full flex flex-col space-between">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Informações Profissionais
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      CPF/CNPJ
                    </label>
                    <input
                      {...register("cpfCnpj", {
                        required: "Campo obrigatório",
                      })}
                      type="text"
                      className="w-full p-2 border rounded"
                    />
                    {errors.cpfCnpj && (
                      <p className="text-red-500 text-sm mt-1">
                        {String(errors.cpfCnpj.message)}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      {...register("telefone", {
                        required: "Campo obrigatório",
                      })}
                      type="text"
                      className="w-full p-2 border rounded"
                    />
                    {errors.telefone && (
                      <p className="text-red-500 text-sm mt-1">
                        {String(errors.telefone.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-6/12 bg-white text-primary border border-primary p-2 mr-2 rounded hover:bg-primary hover:text-white"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-6/12 bg-primary text-white p-2 rounded hover:bg-white hover:text-primary hover:border hover:border-primary ml-2"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Confirmação</h2>
                <div className="mb-4">
                  <p>
                    <strong>Nome:</strong> {watch("nome")}
                  </p>
                  <p>
                    <strong>Email:</strong> {watch("email")}
                  </p>
                  <p>
                    <strong>CPF/CNPJ:</strong> {watch("cpfCnpj")}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {watch("telefone")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-6/12 bg-white text-primary border border-primary p-2 mr-2 rounded hover:bg-primary hover:text-white"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="w-6/12 bg-primary text-white p-2 rounded hover:bg-white hover:text-primary hover:border hover:border-primary ml-2"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            )}
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-primary hover:underline">
              Voltar para Login
            </a>
          </div>
        </div>
      </div>

      {/* Lado Direito: Logo da ContaPlus */}
      <div className="w-1/2 bg-colorLogo flex items-center justify-center">
        <div className="text-white text-center">
          <img src="/icon-pig.png" alt="Logo da ContaPlus" className="w-full" />
        </div>
      </div>
    </div>
  );
}
