import React, { useState, useEffect, useRef } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Pencil, Trash, ChevronRight, ChevronLeft, FileDown, Search, SquarePlus, PackageMinus, CalendarDays, Minus } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { TextInput, NumberInput, Badge } from '@tremor/react';
import { format } from 'date-fns';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, sales, medicines }) => {
  const { flash } = usePage().props; // Obtener los mensajes flash de Inertia

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const MedicineSelect = useRef();
  const QuantityInput = useRef();
  const DateInput = useRef();

  const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
    id: '',
    transaction_code: '',
    medicine: '',
    quantity: '',
    date: new Date().toLocaleDateString(),
    user: ''
  });

  useEffect(() => {
    if (flash?.success) {
      Swal.fire({ title: flash.success, icon: 'success' });
    }
    if (flash?.error) {
      Swal.fire({ title: flash.error, icon: 'error' });
    }
  }, [flash]);

  const openModal = (op, id, transaction_code, medicine, quantity, date, user) => {
    setModal(true);
    setOperation(op);
    setData({ transaction_code: transaction_code, medicine: '', quantity: '', date: new Date().toLocaleDateString(), user: '' });
    if (op === 1) {
      setTitle('Crear salida');
      setData({
        transaction_code: '',
        medicine: medicines.length > 0 ? medicines[0].id : '',
        quantity: '',
        date: new Date().toLocaleDateString(),
        user: ''
      });
      setSelectedMedicine(medicines.length > 0 ? medicines[0] : null);
    } else {
      setTitle('Editar salida');
      setData({ id: id, transaction_code: transaction_code, medicine: medicine.id, quantity: quantity, date: date, user: user });
      const selected = medicines.find((med) => med.id === medicine.id);
      setSelectedMedicine(selected);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const save = (e) => {
    e.preventDefault();
    if (selectedMedicine && data.quantity > selectedMedicine.stock) {
      Swal.fire('Error', 'La cantidad de salida no puede ser mayor que el stock disponible.', 'error');
      return;
    }
    const formData = {
      transaction_code: data.transaction_code,
      medicine: data.medicine,
      quantity: data.quantity,
      date: data.date,
      user: data.user
    };

    const endpoint = operation === 1 ? route('sales.store') : route('sales.update', data.id);
    const onSuccessMessage = operation === 1 ? 'Salida guardada' : 'Salida modificada';

    (operation === 1 ? post : put)(endpoint, {
      data: formData,
      onSuccess: () => {
        closeModal();
        Swal.fire('Éxito', onSuccessMessage, 'success');
      },
      onError: () => {
        if (errors.medicine) {
          reset('medicine');
          MedicineSelect.current.focus();
        }
        if (errors.quantity) {
          reset('quantity');
          QuantityInput.current.focus();
        }
      }
    });
  };

  const eliminar = (id, transaction_code) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la salida "${transaction_code}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(route('sales.destroy', id), {
          onSuccess: () => {
            Swal.fire('Eliminada!', `La salida "${transaction_code}" ha sido eliminada.`, 'success');
          },
          onError: () => {
            Swal.fire('Error!', 'Hubo un problema al eliminar la salida.', 'error');
          }
        });
      }
    });
  };

  const handleMedicineChange = (e) => {
    const selected = medicines.find((med) => med.id === parseInt(e.target.value));
    setSelectedMedicine(selected);
    setData('medicine', e.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Código de Transacción',
        accessor: 'transaction_code',
        Cell: ({ value }) => <span className="font-bold">{value}</span>
      },
      {
        Header: 'Código de Lote',
        accessor: 'medicine.batch_number'
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
        Header: 'Cantidad',
        accessor: 'quantity',
        Cell: ({ value }) => <Badge color={'red'} icon={Minus}> {value}</Badge>
      },
      {
        Header: 'Fecha',
        accessor: 'date'
      },
      {
        Header: 'Salida por ',
        accessor: 'user.name'
      },
      {
        Header: 'Acciones',
        accessor: 'id',
        Cell: ({ row }) => (
          <>
            <Pencil
              className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer"
              onClick={() => openModal(2, row.original.id, row.original.transaction_code, row.original.medicine, row.original.quantity, row.original.date, row.original.user)}
            />
            <Trash
              className="inline-block h-6 w-6 text-red-500 cursor-pointer"
              onClick={() => eliminar(row.original.id, row.original.transaction_code)}
            />
          </>
        )
      }
    ],
    []
  );

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
    state: { pageIndex, globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns,
      data: sales,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const ok = (mensaje) => {
    reset();
    closeModal();
    Swal.fire({ title: mensaje, icon: 'success' });
  };

  const processedSales = sales.map((sale) => ({
    transaction_code: sale.transaction_code,
    batch_number: sale.medicine.batch_number,
    medicine: sale.medicine.name,
    category: sale.medicine.category.name,
    quantity: sale.quantity,
    date: sale.date,
    user: sale.user.name
  }));

  const exportExcel = () => {
    const csvConfig = mkConfig({
      fieldSeparator: ',',
      filename: 'salidas',
      decimalSeparator: '.',
      useKeysAsHeaders: true,
    });

    const csvData = generateCsv(csvConfig)(processedSales);
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
                <PackageMinus className="mr-2 text-sm sm:text-lg" /> Salidas
              </h2>
              <div className="flex">
                <button className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base mr-2" onClick={() => openModal(1)}>
                  Crear Salida
                </button>
                <button type="button" onClick={exportExcel} className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base">
                  <FileDown />
                </button>
              </div>
              <div className="sm:hidden">
                <button className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 rounded text-xs mr-2" onClick={() => openModal(1)}>
                  +
                </button>
                <button type="button" onClick={exportExcel} className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-[9.3px] px-3 rounded text-xs mt-2">
                  <FileDown size={13} />
                </button>
              </div>
            </div>
          </div>
        }
      >
        <Head title="Salidas" />
        <div className="overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-2 sm:mb-0">
              <label htmlFor="search" className="text-gray-700 dark:text-gray-300 mr-2">
                Buscar:
              </label>
              <TextInput
                id="search"
                type="text"
                value={globalFilter || ''}
                icon={Search}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Buscar salida..."
              />
            </div>
            <div className="pagination">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 mr-2"
              >
                <ChevronLeft size={16} className="inline-block" />
              </button>
              <span className="text-gray-700 dark:text-gray-300">
                Página{' '}
                <strong>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
              </span>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 ml-2"
              >
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
                  <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-6 py-4 sm:py-2 lg:py-4 font-medium text-gray-900 dark:text-white">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal show={modal} onClose={closeModal}>
          <h2 className="p-3 text-lg font-medium text-gray-900">{title}</h2>
          <form onSubmit={save} className="p-6">
            <div className="mt-6">
              <InputLabel for="medicine" value="Medicamento" />
              <select
                id="medicine"
                name="medicine"
                ref={MedicineSelect}
                value={data.medicine}
                required="required"
                onChange={handleMedicineChange}
                className="mt-1 block w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="">Selecciona un medicamento</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.id}>
                    {medicine.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.medicine} className="mt-2" />
            </div>
            {selectedMedicine && (
              <div className="mt-6">
                <InputLabel for="stock" value="Stock Disponible" />
                <TextInput
                  id="stock"
                  name="stock"
                  value={selectedMedicine.stock}
                  readOnly
                  className="mt-1 block w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>
            )}
            <div className="mt-6">
              <InputLabel for="quantity" value="Cantidad" />
              <NumberInput
                id="quantity"
                name="quantity"
                ref={QuantityInput}
                value={data.quantity}
                icon={SquarePlus}
                placeholder="Cantidad de salida"
                required="required"
                onChange={(e) => setData('quantity', e.target.value)}
                className="mt-1 flex w-3/4 justify-center"
              />
              <InputError message={errors.quantity} className="mt-2" />
            </div>
            <div className="mt-6">
              <InputLabel for="date" value="Fecha" />
              <TextInput
                id="date"
                name="date"
                ref={DateInput}
                value={format(new Date(), 'yyyy-MM-dd')}
                icon={CalendarDays}
                disabled={true}
                placeholder="Fecha de salida"
                required="required"
                onChange={(e) => setData('date', e.target.value)}
                className="mt-1 flex w-3/4 justify-center"
              />
              <InputError message={errors.date} className="mt-2" />
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
