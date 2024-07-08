import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AddressZipCode } from "@/model/types";

export default function CreateAddressForm({ onClose, onSuccess, clientId }) {
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isCEP, setIsCEP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = {
      address,
      number,
      complement,
      postalCode,
      city,
      state,
      country,
      idClient: clientId,
    };

    try {
      if (!newAddress) {
        toast.warning("Preencha todos os campos");
        return;
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
        newAddress
      );
      onSuccess();
      onClose();
      toast.success("Endereço criado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar endereço", error);
      toast.error("Erro ao cadastrar endereço");
    }
  };

  const handleSearchAddress = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ZIPCODE}/${postalCode}`
    );
    if (response) {
      const result: AddressZipCode = response.data.result;

      setAddress(result.street);
      setComplement(result.complement);
      setPostalCode(result.zipcode);
      setCity(result.city);
      setState(result.stateShortname);
      setCountry("Brasil");

      setIsCEP(true);
    }
  };

  return (
    <div>
      {!isCEP && (
        <div className="flex w-full flex-col">
          <h2>Antes de preencher o endereço, digite seu CEP e prosiga</h2>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleSearchAddress()}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {isCEP && (
        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              Numero
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              Complemento
            </label>
            <input
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              Cidade
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex flex-row gap-4 content-center justify-center">
            <label className="block text-sm font-medium text-gray-700">
              Paìs
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
