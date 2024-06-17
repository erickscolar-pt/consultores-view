import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContexts } from '@/contexts/AuthContexts';
import { Tarefa } from '@/model/types';

interface TarefaFormProps {
  onClose: () => void;
  onSuccess: () => void;
  projetos: { id: number; nome: string }[];
}

export default function TarefaForm({ onClose, onSuccess, projetos }: Readonly<TarefaFormProps>){
  const { createTarefa } = useContext(AuthContexts);

  const [tarefa, setTarefa] = useState<Tarefa>({
    nome: '',
    descricao: '',
    status: '',
    projetoId: 0,
    dataFim: '',
    dataInicio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTarefa((prevTarefa) => ({
      ...prevTarefa,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTarefa(tarefa);
      onSuccess();
      onClose();
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      toast.error('Erro ao criar tarefa. Verifique os dados e tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={tarefa.nome}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={tarefa.descricao}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={tarefa.status}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Selecione o status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="projetoId" className="block text-sm font-medium text-gray-700">
          Projeto
        </label>
        <select
          id="projetoId"
          name="projetoId"
          value={tarefa.projetoId}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value={0}>Selecione o projeto</option>
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">
          Data de Inicio
        </label>
        <input
          type="datetime-local"
          id="dataInicio"
          name="dataInicio"
          value={tarefa.dataInicio}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">
          Data de Término
        </label>
        <input
          type="datetime-local"
          id="dataFim"
          name="dataFim"
          value={tarefa.dataFim}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Criar Tarefa
        </button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </form>
  );
};
