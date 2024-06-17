import { Projeto } from "@/model/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProjetosListPage({ projetos, onUpdateStatus }) {
  const handleStatusChange = async (projeto) => {
    try {
      projeto.status = handleStatus(projeto.status);
      await onUpdateStatus(projeto.id, projeto);
      toast.success(
        `Status do projeto "${projeto.nome}" alterado para ${projeto.status}`
      );
    } catch (error) {
      console.error("Erro ao atualizar status do projeto:", error);
      toast.error("Erro ao atualizar status do projeto");
    }
  };

  function handleStatus(status: string) {
    let res: string = "";
    switch (status) {
      case "Em andamento":
        res = "Concluída";
        break;
      case "Concluída":
        res = "Em andamento";
        break;
      default:
        res = "Em andamento";
        break;
    }
    return res;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {projetos.map((projeto) => (
            <tr key={projeto.id}>
              <td className="py-2 px-4 border-b">{projeto.nome}</td>
              <td className="py-2 px-4 border-b">{projeto.descricao}</td>
              <td className="py-2 px-4 border-b">{projeto.clienteNome}</td>
              <td className="py-2 px-4 border-b">{projeto.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleStatusChange(projeto)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  {handleStatus(projeto.status)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
