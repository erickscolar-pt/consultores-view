import Modal from '@/component/modal';
import ProjetoForm from '@/component/projetoform';
import ProjetosList from '@/component/projetoslist';
import TarefasList from '@/component/tarefalist';
import { AuthContexts } from '@/contexts/AuthContexts';
import { Tarefa } from '@/model/types';
import { useState, useEffect, useContext } from 'react';

export default function Projetos() {
  const { getClientes, getProjetos, getTarefas } = useContext(AuthContexts);

  const [projetos, setProjetos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [selectedProjetoId, setSelectedProjetoId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjetos();
    fetchClientes();
  }, []);

  useEffect(() => {
    if (selectedProjetoId !== null) {
      fetchTarefas(selectedProjetoId);
    }
  }, [selectedProjetoId]);

  const fetchProjetos = async () => {
    const result = await getProjetos();
    setProjetos(result);
  };

  const fetchClientes = async () => {
    const result = await getClientes();
    setClientes(result);
  };

  const fetchTarefas = async (projetoId: number) => {
    const result = await getTarefas();
    const filteredTarefas = result.filter((tarefa: Tarefa) => tarefa.projetoId === projetoId);
    setTarefas(filteredTarefas);
  };

  const handleProjetoClick = (projetoId: number) => {
    setSelectedProjetoId(projetoId);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 pt-24">
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar Projeto
          </button>
        </div>
        <div className="flex">
          <div className="w-1/3 pr-4">
            <ProjetosList projetos={projetos} onProjetoClick={handleProjetoClick} />
          </div>
          <div className="w-2/3 pl-4">
            {selectedProjetoId !== null ? (
              <TarefasList tarefas={tarefas} onUpdateTarefa={() => fetchTarefas(selectedProjetoId)} />
            ) : (
              <p>Selecione um projeto para visualizar as tarefas.</p>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ProjetoForm onClose={() => setShowModal(false)} onSuccess={fetchProjetos} clientes={clientes} />
      </Modal>
    </div>
  );
}
