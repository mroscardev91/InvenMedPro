import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Users, Pencil, Trash } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import Sidebar, { SidebarItem } from '@/Components/Sidebar';
import Modal from '@/Components/Modal';



const Index = ({ auth, users }) => {

  return (
    <>
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-white leading-tight flex items-center">
                <Users className="mr-2" /> Usuario
            </h2>
            {/* Botón para ir a la ruta de creación de usuarios */}
            <Link href={route('users.create')}>
              <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Crear Usuario
              </button>
            </Link>
        </div>
     }
      
    >
      <Head title="Usuarios" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.roles.length > 0 ? (
                    user.roles.map(role => (
                      <span key={role.id} className="inline-block px-2 py-1 mr-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                        {role.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Aún no tiene roles asignados!</span>
                  )}
                </td>
                <td className="px-6 py-4">
                    <Pencil className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer" /> 
                    <Link
                      href={route('users.destroy', [user])}
                      method="delete"
                    >
                        <Trash className="inline-block h-6 w-6 text-red-500 cursor-pointer"/> 
                    </Link>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
    </>
  );
};

export default Index;
