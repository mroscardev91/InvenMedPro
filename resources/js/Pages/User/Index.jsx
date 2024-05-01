import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


const Index = ({ auth, users }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
    >

    <Head title="Usuarios" />
      
    <div className="relative overflow-x-auto">
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
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody>
        {
            users?.map(user => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                </th>
                
                <td className="px-6 py-4">
                    {user.email}
                </td>

                <td className="px-6 py-4">
                    // proximamente
                </td>
            </tr>
            ))
        }
        </tbody>
    </table>
</div>
    </AuthenticatedLayout>
  );
};

export default Index;
