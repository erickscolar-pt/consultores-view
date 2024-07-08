import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '@/component/header';
import AddressList from '@/component/AddressList';
import { toast } from 'react-toastify';

export default function Enderecos() {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  const fetchAddresses = async (clientId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}/addresses`);

      if(response.data){
        setAddresses(response.data);
      }else{
        toast.warn("Este cliente não possui endereço")
        return;
      }
    } catch (error) {
      console.error(`Erro ao buscar endereços do cliente ${clientId}`, error);
    }
  };

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
    fetchAddresses(clientId);
  };

  const selectedClientName = selectedClient ? clientes.find(c => c.id === selectedClient)?.firstName : '';

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Endereço</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Selecione um cliente:</label>
            <select
              value={selectedClient}
              onChange={(e) => handleClientChange(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.firstName} {cliente.lastName}</option>
              ))}
            </select>
          </div>
          {selectedClient && (
            <div>
              <AddressList addresses={addresses} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
