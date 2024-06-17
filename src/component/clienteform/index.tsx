import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ClienteForm ({ onClose, onSuccess }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCliente = { nome, email, telefone };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clientes`, newCliente);
      onSuccess();
      onClose();
      toast.success('Projeto criado com sucesso!')

    } catch (error) {
      console.error('Erro ao cadastrar cliente', error);
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
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