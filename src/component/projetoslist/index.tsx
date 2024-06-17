import React from 'react';

export default function ProjetosList({ projetos }) {
  return (
    <div>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <ul>
          {projetos.map(projeto => (
            <li key={projeto.id} className="border-b py-2">
              {projeto.nome} - {projeto.descricao} ({projeto.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
