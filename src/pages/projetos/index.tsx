import Modal from '@/component/modal';
import ProjetoForm from '@/component/projetoform';
import ProjetosList from '@/component/projetoslist';
import { AuthContexts } from '@/contexts/AuthContexts';
import { useState, useEffect, useContext } from 'react';

export default function Projetos(){
  const { getClientes, getProjetos } = useContext(AuthContexts);

  const [projetos, setProjetos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchProjetos = async () => {
    const result = await getProjetos();
    setProjetos(result);
  };

  const fetchClientes = async () => {
    const result = await getClientes();
    setClientes(result);
  };

  useEffect(() => {
    fetchProjetos();
    fetchClientes();
  }, []);

  return (
    <div className="flex space-x-6 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projetos</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Adicionar Projeto
      </button>
      <ProjetosList projetos={projetos} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ProjetoForm onClose={() => setShowModal(false)} onSuccess={fetchProjetos} clientes={clientes} />
      </Modal>
    </div>
  );
};