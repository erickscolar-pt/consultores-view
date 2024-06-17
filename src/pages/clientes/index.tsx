import ClienteForm from '@/component/clienteform';
import ClientesList from '@/component/clienteslist';
import Modal from '@/component/modal';
import { AuthContexts } from '@/contexts/AuthContexts';
import { useState, useEffect, useContext } from 'react';

export default function Clientes(){
  const { getClientes } = useContext(AuthContexts);

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchClientes = async () => {
    const result = await getClientes();
    setClientes(result);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Adicionar Cliente
      </button>
      <ClientesList clientes={clientes} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ClienteForm onClose={() => setShowModal(false)} onSuccess={fetchClientes} />
      </Modal>
    </div>
  );
};