
import React, { useState, useRef } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { ChevronRight, ChevronLeft, Package, FileDown, Search, Package2, Printer } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { TextInput, NumberInput, Badge } from '@tremor/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, medicines }) => {

  // Define las columnas de la tabla
  const columns = React.useMemo(
    () => [

      {
        Header: 'Código de Lote',
        accessor: 'batch_number'
      },

      {
        Header: 'Medicamento',
        accessor: 'name'
      },

      {
        Header: 'Categoría',
        accessor: 'category.name'
      },

      {
        Header: 'Precio de compra',
        accessor: 'purchase_price'
      },

      {
        Header: 'Precio de venta',
        accessor: 'selling_price'
      },

      {
        Header: 'Stock',
        accessor: 'stock', 
        Cell: ({ value }) =><Badge color={'slate'} icon={Package2}> {value}</Badge>
      },

    ],
    []
  );

  // Configuración de la tabla
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
    setGlobalFilter
  } = useTable(
    {
      columns,
      data: medicines,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );


  // Extraer la información de las medicinas para que no sea un objeto
  const processedStocks = medicines.map((medicine) => ({
    medicine: medicine.name,
    category: medicine.category.name,
    purchase_price: medicine.purchase_price,
    selling_price: medicine.selling_price,
    stock: medicine.stock

  }));


  // Función para exportar la tabla como CSV
  const exportExcel = () => {
    const csvConfig = mkConfig({
      fieldSeparator: ',',
      filename: 'stock',
      decimalSeparator: '.',
      useKeysAsHeaders: true,
    });

    const csvData = generateCsv(csvConfig)(processedStocks);
    download(csvConfig)(csvData);
  };

  // Función para imprimir la tabla
  const printTable = () => {
    const table = document.getElementById('dataTable').outerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = table;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // recargar la página para restaurar los eventos de React
  };


  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-1 flex justify-between items-center">
              <h2 className="font-semibold text-lg sm:text-xl text-white leading-tight flex items-center">
                <Package className="mr-2 text-sm sm:text-lg" /> Stock
              </h2>
              {/* Botones para imprimir y descargar */}
              <div className="flex">
                {/* Botón para imprimir */}
                <button type="button" onClick={printTable} className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base mr-2">
                  <Printer />
                </button>
                {/* Botón para descargar */}
                <button type="button" onClick={exportExcel} className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base">
                  <FileDown />
                </button>
              </div>
              {/* Botones para crear categoría y descargar en pantallas pequeñas */}
              <div className="sm:hidden">
                {/* Botón para imprimir en pantallas pequeñas */}
                <button type="button" onClick={printTable} className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-[9.3px] px-3 rounded text-xs mt-2 mr-2">
                  <Printer size={13} />
                </button>
                {/* Botón para descargar en pantallas pequeñas */}
                <button type="button" onClick={exportExcel} className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-[9.3px] px-3 rounded text-xs mt-2">
                  <FileDown size={13} />
                </button>
              </div>
            </div>
          </div>
        }
      >
        <Head title="Stock" />
        <div className="overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">

            <div className="flex items-center mb-2 sm:mb-0">
              <label htmlFor="search" className="text-gray-700  dark:text-gray-300 mr-2">
                Buscar:
              </label>
              <TextInput
                id="search"
                type="text"
                value={globalFilter || ''}
                icon={Search}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Buscar stock..."
              >
              </TextInput>
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
          <table id="dataTable" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" {...getTableProps()}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
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
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  {...row.getRowProps()}>
                    {row.cells.map((cell) => {
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
        {/* Modal para crear/editar entrada */}
      </AuthenticatedLayout>
    </>
  );
};

export default Index;