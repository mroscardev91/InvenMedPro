import { Head, Link } from '@inertiajs/react';

const Index = ({ userRole }) => {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-500">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Oops!</h2>
          <p className="text-gray-600 text-center">
            No tienes permisos para acceder a esta página.
            Tu rol actual es: <span className="font-semibold">{userRole}</span>.
            Para acceder necesitas el rol de <span className="font-semibold text-orange-500">Administrador del Sistema.</span>.
          </p>
          <div className="flex justify-center"> 
            <button className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
              <Link href={route('dashboard')}>Volver al Dashboard</Link>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Index;