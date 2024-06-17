import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProjetoForm ({ onClose, onSuccess, clientes }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [clienteId, setClienteId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProjeto = { nome, descricao, status, clienteId };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projetos`, newProjeto);
      onSuccess();
      onClose();
      toast.success('Projeto criado com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar projeto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Selecione o status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cliente</label>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="" disabled>Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="mr-2">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Salvar
        </button>
      </div>
    </form>
  );
};