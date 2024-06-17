import { Header } from '@/component/header';
import Projetos from './projetos';
import Clientes from './clientes';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Clientes</h2>
            <Clientes />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Projetos</h2>
            <Projetos />
          </div>
        </div>
      </div>
    </div>
  );
}
