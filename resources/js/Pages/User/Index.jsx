import React from 'react';
import { useState, useRef } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Users, Pencil, Trash, ChevronRight, ChevronLeft } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const Index = ({ auth, users }) => {

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const NameInput = useRef();
  const EmailInput = useRef();
  const PasswordInput = useRef();
  const { data, setData, delete:destroy, post, put,
    processing, reset, errors} = useForm({
        id:'', name:'', email: '', password: ''
    });
  
  const openModal = (op,id,name,email,password) =>{
    setModal(true);
    setOperation(op);
    setData({name:'',email:'',password:''});
    if(op === 1){
        setTitle('Crear usuario');
    }
    else{
        setTitle('Editar usuario');
        setData({id:id,name:name,email:email,password:password});
    }
  }
  
  const closeModal = () =>{
    setModal(false);
  }

  const save = (e) =>{
    e.preventDefault();
    if(operation === 1){
        post(route('users.store'),{
            onSuccess: () => { ok('Usuario guardado')},
            onError: () => {
                if(errors.name){
                    reset('name');
                    NameInput.current.focus();
                }
                if(errors.email){
                    reset('email');
                    EmailInput.current.focus();
                }
                if(errors.password){
                    reset('password');
                    PasswordInput.current.focus();
                }
            }
        });
    }
    else{
        put(route('users.update',data.id),{
            onSuccess: () => { ok('Usuario modificado')},
            onError: () => {
                if(errors.name){
                    reset('name');
                    NameInput.current.focus();
                }
                if(errors.email){
                    reset('email');
                    EmailInput.current.focus();
                }
                if(errors.password){
                    reset('password');
                    PasswordInput.current.focus();
                }
            }
        });
      }
    }

    const ok = (mensaje) =>{
      reset();
      closeModal();
      Swal.fire({title:mensaje,icon:'success'});
    }

    const eliminar = (id) =>{
      const userToDelete = users.find(user => user.id === id);
      const alerta = Swal.mixin({ buttonsStyling:true});
      alerta.fire({
          title:`Seguro que quieres eliminar el usuario ${userToDelete.name}`,
          text:'Se eliminara el usuario de forma permanente',
          icon:'question', showCancelButton:true,
          confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
          cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
      }).then((result) => {
          if(result.isConfirmed){
              destroy(route('users.destroy',id),
              {onSuccess: () =>{ok('Usuario eliminado')}});
          }
      });
  }






  // Tabla
  const userData = React.useMemo(() => users, [users]);
  
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
      Cell: ({ row, value }) => (
        <>
          <Pencil className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer" onClick={() =>openModal(2,row.original.id, row.original.name, row.original.email, row.original.password)}/> 
          
          <Trash className="inline-block h-6 w-6 text-red-500 cursor-pointer" onClick={() => eliminar(value)}/> 
          

          
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
      data : userData,
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
                  <Users className="mr-2" /> Usuarios
              </h2>
            
              <button className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" onClick={() =>openModal(1)}>
                Crear Usuario
              </button>
              
          </div>
        }
      >
        <Head title="Usuarios" />
        <div className="overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-2 sm:mb-0">
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
        <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <form onSubmit={save} className="p-6">
                    <div className='mt-6'>
                        <InputLabel for="name" value="Nombre"></InputLabel>
                        <TextInput id="name" name="name" ref={NameInput}
                        value={data.name} required='required'
                        onChange={(e) => setData('name',e.target.value)}
                        className="mt-1 block w-3/4" isFocused></TextInput>
                        <InputError message={errors.name} classNamemt-2></InputError>
                    </div>
                    <div className='mt-6'>
                        <InputLabel for="email" value="Correo Electronico"></InputLabel>
                        <TextInput id="email" name="email" ref={EmailInput}
                        value={data.email} required='required'
                        onChange={(e) => setData('email',e.target.value)}
                        className="mt-1 block w-3/4"></TextInput>
                        <InputError message={errors.email} classNamemt-2></InputError>
                    </div>
                    <div className='mt-6'>
                        <InputLabel for="password" value="Contraseña"></InputLabel>
                        <TextInput id="passwordpassword" name="password" ref={PasswordInput}
                        value={data.password} required='required'
                        onChange={(e) => setData('password',e.target.value)}
                        className="mt-1 block w-3/4"></TextInput>
                        <InputError message={errors.password} classNamemt-2></InputError>
                    </div>
                    <div className='mt-6'>
                        <PrimaryButton processing={processing} className='mt-2'>
                            <i className='fa-solid fa-save'></i>Guardar
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
