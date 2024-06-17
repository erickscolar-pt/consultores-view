import React from 'react';

export default function ClientesList ({ clientes }) {
  return (
    <div>
      {clientes.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id} className="border-b py-2">
              {cliente.nome} ({cliente.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};