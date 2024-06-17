import { useState, useEffect, useContext } from 'react';
import Modal from '@/component/modal';
import ProjetoForm from '@/component/projetoform';
import { AuthContexts } from '@/contexts/AuthContexts';
import { Header } from '@/component/header';
import ProjetosListPage from '@/component/projetolistpage';

export default function Projetos() {
  const { getClientes, getProjetos, updateProjetoStatus } = useContext(AuthContexts);

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

  const handleUpdateStatus = async (id, status) => {
    await updateProjetoStatus(id, status);
    fetchProjetos();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Projetos</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Adicionar Projeto
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <ProjetosListPage projetos={projetos} onUpdateStatus={handleUpdateStatus} />
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ProjetoForm onClose={() => setShowModal(false)} onSuccess={fetchProjetos} clientes={clientes} />
        </Modal>
      </div>
    </div>
  );
}
