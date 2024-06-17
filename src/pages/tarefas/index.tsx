import { Header } from '@/component/header';
import Modal from '@/component/modal';
import TarefaForm from '@/component/tarefaform';
import TarefasList from '@/component/tarefalist';
import { AuthContexts } from '@/contexts/AuthContexts';
import { Tarefa } from '@/model/types';
import { useState, useEffect, useContext } from 'react';

export default function Tarefas() {
  const { getProjetos, getTarefas } = useContext(AuthContexts);

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [projetos, setProjetos] = useState<{ id: number; nome: string }[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTarefas();
    fetchProjetos();
  }, []);

  const fetchTarefas = async () => {
    const data = await getTarefas();
    setTarefas(data);
  };

  const fetchProjetos = async () => {
    const data = await getProjetos();
    setProjetos(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tarefas</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar Tarefa
          </button>
        </div>
        <TarefasList tarefas={tarefas} />
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <TarefaForm
          onClose={() => setShowModal(false)}
          onSuccess={fetchTarefas}
          projetos={projetos}
        />
      </Modal>
    </div>
  );
}
