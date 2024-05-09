
import React, { useState, useRef } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Users, Pencil, Trash, ChevronRight, ChevronLeft, Package, Pill, FileDown } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { mkConfig, generateCsv, download } from 'export-to-csv'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, medicines, categories }) => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const NameInput = useRef();
    const DetailsInput = useRef();
    const CategorySelect = useRef();
    const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
      id: '',
      name: '',
      details: '',
      category: '',
    });
  
    // Función para abrir el modal
    const openModal = (op, id, name, details, category) => {
      setModal(true);
      setOperation(op);
      setData({ name: ''}); // Reinicia los datos al abrir el modal
      if (op === 1) {
        setTitle('Crear medicamento');
        setData({
          id: '',
          name: '',
          details: '',
          category: categories.length > 0 ? categories[0].id : '' // Asegura que categories tiene al menos un elemento
        });
      } else {
        setTitle('Editar medicamento');
        setData({ id: id, name: name, details: details, category: category.id});
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
        name: data.name,
        details: data.details,
        category: data.category,
      };
  
      // Lógica para determinar si es una operación de creación o edición
      const endpoint = operation === 1 ? route('medicines.store') : route('medicines.update', data.id);
      const onSuccessMessage = operation === 1 ? 'Medicamento guardado' : 'Medicamento modificado';
  
      // Realiza la petición POST o PUT según la operación
      (operation === 1 ? post : put)(endpoint, {
        data: formData,
        onSuccess: () => {
          ok(onSuccessMessage);
        },
        onError: () => {
          // Lógica para manejar errores
          if (errors.name) {
            reset('name');
            NameInput.current.focus();
          }
          if (errors.details) {
            reset('details');
            DetailsInput.current.focus();
          }
          if (errors.category) {
            reset('category');
            CategorySelect.current.focus();
          }
          
        }
      });
    };
  
    // Función para eliminar usuario
    const eliminar = (id, name) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el medicamento "${name}"? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('medicines.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Eliminado!',
                            `El medicamento "${name}" ha sido eliminado.`,
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Error!',
                            'Hubo un problema al eliminar el medicamento.',
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
          Header: 'Nombre',
          accessor: 'name'
        },

        {
          Header: 'Detalles',
          accessor: 'details'
        },

        {
          Header: 'Categoría',
          accessor: 'category',
          Cell: ({ value }) => <span>{value.name}</span> 
        },

        {
          Header: 'Acciones',
          accessor: 'id',
          Cell: ({ row }) => (
            <>
              <Pencil
                className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer"
                onClick={() => openModal(2, row.original.id, row.original.name, row.original.details, row.original.category)} 
              />
              <Trash className="inline-block h-6 w-6 text-red-500 cursor-pointer" onClick={() => eliminar(row.original.id, row.original.name)} />
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
        data: medicines, 
        initialState: { pageIndex: 0, pageSize: 9 }
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
    {console.log(data)}

    // Extraer la información de las medicinas para que no sea un objeto
    const processedMedicines = medicines.map(medicine => ({
      name: medicine.name,
      details: medicine.details,
      category: medicine.category.name 
    }));

    // Función para exportar la tabla como CSV
    const exportExcel = () => {
      const csvConfig = mkConfig({
          fieldSeparator: ',',
          filename: 'medicamentos', 
          decimalSeparator: '.',
          useKeysAsHeaders: true,
      });

      const csvData = generateCsv(csvConfig)(processedMedicines);
      download(csvConfig)(csvData);
    };
  
    return (
      <>
        <AuthenticatedLayout
          user={auth.user}
          header={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4 flex justify-between items-center">
                <h2 className="font-semibold text-lg sm:text-xl text-white leading-tight flex items-center">
                  <Pill className="mr-2 text-sm sm:text-lg" /> Medicamentos
                </h2>
                {/* Botones para crear categoría y descargar */}
                <div className="flex">
                  {/* Botón para crear categoría */}
                  <button className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base mr-2" onClick={() => openModal(1)}>
                    Crear Medicamento
                  </button>
                  {/* Botón para descargar */}
                  <button type="button" onClick={exportExcel} className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base">
                    <FileDown/>
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
                    <FileDown size={13}/>
                  </button>
                </div>
              </div>
            </div>
          }
        >
          <Head title="Medicamentos" />
          <div className="overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <label htmlFor="search" className="text-gray-700 dark:text-gray-300 mr-2">
                  Buscar:
                </label>
                <input
                  id="search"
                  type="text"
                  value={globalFilter || ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
                  placeholder="Buscar medicamento..."
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
          {/* Modal para crear/editar categoría */}
          <Modal show={modal} onClose={closeModal}>
            <h2 className="p-3 text-lg font-medium text-gray-900">{title}</h2>
            <form onSubmit={save} className="p-6">
              <div className="mt-6">
                <InputLabel for="name" value="Nombre"></InputLabel>
                <TextInput
                  id="name"
                  name="name"
                  ref={NameInput}
                  value={data.name}
                  required="required"
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 block w-3/4"
                  isFocused
                ></TextInput>
                <InputError message={errors.name} className="mt-2"></InputError>
              </div>

              <div className="mt-6">
              <InputLabel for="category" value="Categoria"></InputLabel>
              {console.log("Valor de data.role", data.category)}

              <select
                id="category"
                name="category"
                ref={CategorySelect}
                value={data.category}
                
                required="required"
                onChange={(e) => setData('category', e.target.value)}
                className="mt-1 block w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.category} className="mt-2"></InputError>
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