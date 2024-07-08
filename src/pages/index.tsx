import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/component/header";
import Clientes from "./clientes";
import CreateClientForm from "@/component/CreateClientForm";
import CreateAddressForm from "@/component/CreateAddressForm";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [showClientForm, setShowClientForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clients`
      );
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };

  const handleAddClient = () => {
    setShowClientForm(true);
  };

  const handleCloseClientForm = () => {
    setShowClientForm(false);
  };

  const handleAddAddress = (clientId) => {
    setSelectedClient(clientId);
    setShowAddressForm(true);
  };

  const handleCloseAddressForm = () => {
    setShowAddressForm(false);
    setSelectedClient(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Clientes</h2>
            <div className="mb-4">
              <button
                onClick={handleAddClient}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Adicionar Cliente
              </button>
            </div>
            <Clientes clientes={clientes} onAddAddress={handleAddAddress} />
          </div>
        </div>
      </div>

      {showClientForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Novo Cliente</h2>
            <CreateClientForm
              onClose={handleCloseClientForm}
              onSuccess={() => {
                fetchClientes();
                handleCloseClientForm();
              }}
            />
          </div>
        </div>
      )}

      {showAddressForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Novo Endereço</h2>
            <CreateAddressForm
              clientId={selectedClient}
              onClose={handleCloseAddressForm}
              onSuccess={() => {
                fetchClientes();
                handleCloseAddressForm();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
