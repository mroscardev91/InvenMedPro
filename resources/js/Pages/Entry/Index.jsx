
import React, { useState, useRef } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Users, Pencil, Trash, ChevronRight, ChevronLeft, Package, FileDown, Search, SquarePlus, CalendarDays } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { TextInput, NumberInput, DatePicker } from '@tremor/react';
import { format } from 'date-fns';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, entries, medicines, suppliers }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const MedicineSelect = useRef();
  const CategoryInput = useRef();
  const SupplierSelect = useRef();
  const QuantityInput = useRef();
  const DateInput = useRef();
  const UserInput = useRef();
  const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
    id: '',
    transaction_code: '',
    medicine: '',
    category: '',
    supplier: '',
    quantity: '',
    date: new Date().toLocaleDateString(),
    user: ''

  });

  
  // Función para abrir el modal
  const openModal = (op, id, transaction_code, medicine, category, supplier, quantity, date, user) => {
    setModal(true);
    setOperation(op);
    setData({ transaction_code: transaction_code, medicine: '', category: '', supplier: '', quantity: '', date: new Date().toLocaleDateString(), user: '' }); // Reinicia los datos al abrir el modal
    if (op === 1) {
      setTitle('Crear entrada');
    } else {
      setTitle('Editar entrada');
      setData({ id: id, transaction_code: transaction_code, medicine: medicine.id, category: category, supplier: supplier.id, quantity: quantity, date: date, user: user });
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModal(false);
  };

  // Función para guardar cambios
  const save = (e) => {
    e.preventDefault();
    const formData = {
      transaction_code: data.transaction_code,
      medicine: data.medicine,
      category: data.category,
      supplier: data.supplier,
      quantity: data.quantity,
      date: date,
      user: data.user
    };

    // Lógica para determinar si es una operación de creación o edición
    const endpoint = operation === 1 ? route('entries.store') : route('entries.update', data.id);
    const onSuccessMessage = operation === 1 ? 'Entrada guardada' : 'Entrada modificada';

    // Realiza la petición POST o PUT según la operación
    (operation === 1 ? post : put)(endpoint, {
      data: formData,
      onSuccess: () => {
        ok(onSuccessMessage);
      },
      onError: () => {
        // Lógica para manejar errores
        if (errors.medicine) {
          reset('medicine');
          MedicineSelect.current.focus();
        }
        if (errors.category) {
          reset('category');
          CategoryInput.current.focus();
        }
        if (errors.supplier) {
          reset('supplier');
          SupplierInput.current.focus();
        }
        if (errors.quantity) {
          reset('quantity');
          QuantityInput.current.focus();
        }
        if (errors.date) {
          reset('date');
          DateInput.current.focus();
        }
        if (errors.user) {
          reset('user');
          UserInput.current.focus();
        }

      }
    });
  };

  // Función para eliminar usuario
  const eliminar = (id, transaction_code) => {
    console.log(transaction_code);
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la entrada "${transaction_code}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(route('entries.destroy', id), {
          onSuccess: () => {
            Swal.fire(
              'Eliminada!',
              `La entrada "${transaction_code}" ha sido eliminada.`,
              'success'
            );
          },
          onError: () => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la entrada.',
              'error'
            );
          }
        });
      }
    });
  };

  // Define las columnas de la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: 'Código de Transacción',
        accessor: 'transaction_code',
        Cell: ({ value }) => <span className="font-bold">{value}</span>
      },
      {
        Header: 'Medicamento',
        accessor: 'medicine.name'
      },

      {
        Header: 'Categoría',
        accessor: 'medicine.category.name'
      },

      {
        Header: 'Proveedor',
        accessor: 'supplier.name'
      },

      {
        Header: 'Cantidad',
        accessor: 'quantity'
      },

      {
        Header: 'Fecha',
        accessor: 'date'
      },

      {
        Header: 'Entrada por ',
        accessor: 'user.name'
      },


      {
        Header: 'Acciones',
        accessor: 'id',
        Cell: ({ row }) => (
          <>
            <Pencil
              className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer"
              onClick={() => openModal(2, row.original.id, row.original.code_transaction, row.original.medicine, row.original.category, row.original.supplier, row.original.quantity, row.original.date, row.original.user)}
            />
            <Trash className="inline-block h-6 w-6 text-red-500 cursor-pointer" onClick={() => eliminar(row.original.id, row.original.transaction_code)} />
          </>
        )
      }
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
      data: entries,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Función para mostrar mensaje de éxito
  const ok = (mensaje) => {
    reset(); // Reinicia los datos del formulario
    closeModal(); // Cierra el modal
    Swal.fire({ title: mensaje, icon: 'success' }); // Muestra la alerta de éxito
  };
  { console.log(data) }

  // Extraer la información de las medicinas para que no sea un objeto
  const processedEntries = entries.map((entry) => ({
    code_transaction: entry.transaction_code,
    medicine: entry.medicine.name,
    category: entry.medicine.category.name,
    supplier: entry.supplier.name,
    quantity: entry.quantity,
    date: entry.date,
    user: entry.user.name

  }));


  // Función para exportar la tabla como CSV
  const exportExcel = () => {
    const csvConfig = mkConfig({
      fieldSeparator: ',',
      filename: 'entradas',
      decimalSeparator: '.',
      useKeysAsHeaders: true,
    });

    const csvData = generateCsv(csvConfig)(processedEntries);
    download(csvConfig)(csvData);
  };


  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-1 flex justify-between items-center">
              <h2 className="font-semibold text-lg sm:text-xl text-white leading-tight flex items-center">
                <Package className="mr-2 text-sm sm:text-lg" /> Entradas
              </h2>
              {/* Botones para crear categoría y descargar */}
              <div className="flex">
                {/* Botón para crear categoría */}
                <button className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base mr-2" onClick={() => openModal(1)}>
                  Crear Entrada
                </button>
                {/* Botón para descargar */}
                <button type="button" onClick={exportExcel} className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base">
                  <FileDown />
                </button>
              </div>
              {/* Botones para crear categoría y descargar en pantallas pequeñas */}
              <div className="sm:hidden">
                {/* Botón para crear categoría en pantallas pequeñas */}
                <button className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 rounded text-xs mr-2" onClick={() => openModal(1)}>
                  +
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
        <Head title="Entradas" />
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
                placeholder="Buscar entrada..."
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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" {...getTableProps()}>
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
        <Modal show={modal} onClose={closeModal}>
          <h2 className="p-3 text-lg font-medium text-gray-900">{title}</h2>
          <form onSubmit={save} className="p-6">

            <div className="mt-6">
              <InputLabel for="medicine" value="Medicamento"></InputLabel>

              <select
                id="medicine"
                name="medicine"
                ref={MedicineSelect}
                value={data.medicine}
                required="required"
                onChange={(e) => setData('medicine', e.target.value)}
                className="mt-1 block w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              >
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.id}>
                    {medicine.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.medicines} className="mt-2"></InputError>
            </div>

            <div className="mt-6">
              <InputLabel for="supplier" value="Proveedor"></InputLabel>

              <select
                id="supplier"
                name="supplier"
                ref={SupplierSelect}
                value={data.supplier}
                required="required"
                onChange={(e) => setData('supplier', e.target.value)}
                className="mt-1 block w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              >
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.suppliers} className="mt-2"></InputError>
            </div>

            <div className="mt-6">
              <InputLabel for="quantity" value="Cantidad"></InputLabel>
              <NumberInput
                id="quantity"
                name="quantity"
                ref={QuantityInput}
                value={data.quantity}
                icon={SquarePlus}
                placeholder="Cantidad de entrada"
                required="required"
                onChange={(e) => setData('quantity', e.target.value)}
                className="mt-1 flex w-3/4 justify-center"
                isFocused
              ></NumberInput>
              <InputError message={errors.quantity} className="mt-2"></InputError>
            </div>

            <div className="mt-6">
              <InputLabel for="date" value="Fecha"></InputLabel>
              <TextInput
                id="date"
                name="date"
                ref={DateInput}
                value={format(new Date(), 'yyyy-MM-dd')}
                icon={CalendarDays }
                disabled={true}
                placeholder="Fecha de entrada"
                required="required"
                onChange={(e) => setData('date', e.target.value)}
                className="mt-1 flex w-3/4 justify-center"
                isFocused
              ></TextInput>
              <InputError message={errors.date} className="mt-2"></InputError>
            </div>



            <div className="mt-6">
              <PrimaryButton processing={processing} className="mt-2">
                <i className="fa-solid fa-save"></i>Guardar
              </PrimaryButton>
            </div>
            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
            </div>
          </form>
        </Modal>
      </AuthenticatedLayout>
    </>
  );
};

export default Index;