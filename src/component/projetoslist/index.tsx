import React from 'react';

interface ProjetosListProps {
  projetos: { id: number; nome: string; descricao: string; status: string; clienteNome: string }[];
  onProjetoClick: (projetoId: number) => void;
}

export default function ProjetosList({ projetos, onProjetoClick }: ProjetosListProps) {
  const projetosAbertos = projetos.filter(projeto => projeto.status === 'Em andamento');

  return (
    <div>
      {projetosAbertos.length === 0 ? (
        <p>Nenhum projeto em aberto encontrado.</p>
      ) : (
        <ul>
          {projetosAbertos.map((projeto) => (
            <li
              key={projeto.id}
              className="border-b py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => onProjetoClick(projeto.id)}
            >
              <div>
                <p className="font-semibold">{projeto.nome}</p>
                <p className="text-sm text-gray-600">{projeto.descricao}</p>
                <p className="text-sm text-gray-600">Cliente: {projeto.clienteNome}</p>
                <p className="text-sm text-gray-600">Status: {projeto.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
