export default function AddressList({ addresses }) {
  return (
    <div>
      {addresses.map((address) => (
        <div key={address.id} className="mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{address.address}</h3>
            <p>{address.number}</p>
            {address.complement && <p>{address.complement}</p>}
            <p>{address.postalCode}</p>
            <p>
              {address.city}, {address.state}, {address.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
