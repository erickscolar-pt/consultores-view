import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateClientForm({ onClose, onSuccess }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newClient = { firstName, lastName, email };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, newClient);
            onSuccess();
            onClose();
            toast.success('Cliente criado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar cliente', error);
            toast.error('Erro ao cadastrar cliente');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Primeiro nome</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white py-2 px-4 rounded">
                    Cancelar
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Salvar
                </button>
            </div>
        </form>
    );
}
