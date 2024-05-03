import React from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Users, Pencil, Trash, ChevronRight, ChevronLeft } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, users }) => {
  const data = React.useMemo(() => users, [users]);
  
  const columns = React.useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Rol',
      accessor: 'roles',
      Cell: ({ value }) => (
        <>
          {value.length > 0 ? (
            value.map(role => (
              <span key={role.id} className="inline-block px-2 py-1 mr-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                {role.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Aún no tiene roles asignados!</span>
          )}
        </>
      ),
    },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ value }) => (
        <>
          <Pencil className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer" /> 
          <Link
            href={route('users.destroy', [value])}
            method="delete"
            as='button'
          >
            <Trash className="inline-block h-6 w-6 text-red-500 cursor-pointer"/> 
          </Link>
        </>
      ),
    },
  ], []);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 9},
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h2 className="font-semibold text-xl text-white leading-tight flex items-center">
                  <Users className="mr-2" /> Usuario
              </h2>
              <Link href={route('users.create')}>
                <button className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                  Crear Usuario
                </button>
              </Link>
          </div>
        }
      >
        <Head title="Usuarios" />
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <label htmlFor="search" className="text-gray-700 dark:text-gray-300 mr-2">Buscar:</label>
              <input
                id="search"
                type="text"
                value={globalFilter || ''}
                onChange={e => setGlobalFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Buscar usuario..."
              />
            </div>
            <div className="pagination">
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 mr-2">
                <ChevronLeft size={16} className="inline-block" />
              </button>
              <span className="text-gray-700 dark:text-gray-300">
                Página{' '}
                <strong>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
              </span>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 ml-2">
                <ChevronRight size={16} className="inline-block" />
              </button>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" {...getTableProps()}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="px-6 py-3 sm:py-2 lg:py-3">
                      <span {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()} className="px-6 py-4 sm:py-2 lg:py-4 font-medium text-gray-900 dark:text-white">
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default Index;
