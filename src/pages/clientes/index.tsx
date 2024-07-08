export default function Clientes ({ clientes, onAddAddress }) {
  return (
    <div>
      {clientes.map((cliente) => (
        <div key={cliente.id} className="mb-4">
          <div className="flex items-center justify-between bg-gray-200 p-4 rounded-md">
            <div>
              <h3 className="text-lg font-semibold">{cliente.firstName} {cliente.lastName}</h3>
              <p className="text-sm">{cliente.email}</p>
            </div>
            <div>
              <button
                onClick={() => onAddAddress(cliente.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Adicionar Endereço
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};