import React, { useState, useRef } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Pencil, Trash, ChevronRight, ChevronLeft, ReceiptEuro, Search, SquarePlus, Printer } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { TextInput } from '@tremor/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, sales, invoices, medicines }) => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const SaleSelect = useRef(null);
    const ClientNameInput = useRef(null);

    const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
        id: '',
        sale: '',
        client_name: '',
    });

    const openModal = (op, id = '', invoice_number = '', sale = '', client_name = '') => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle('Crear Factura');
            setData({ sale: '', client_name: '' });
        } else {
            setTitle('Editar Factura');
            setData({ id, invoice_number, sale: sale.id, client_name });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const save = (e) => {
        e.preventDefault();
        const formData = { sale: data.sale, client_name: data.client_name };
        const endpoint = operation === 1 ? route('invoices.store') : route('invoices.update', data.id);
        const onSuccessMessage = operation === 1 ? 'Factura guardada' : 'Factura modificada';

        (operation === 1 ? post : put)(endpoint, {
            data: formData,
            onSuccess: () => {
                closeModal();
                Swal.fire('Éxito', onSuccessMessage, 'success');
            },
            onError: () => {
                if (errors.sale) {
                    reset('sale');
                    SaleSelect.current.focus();
                }
                if (errors.client_name) {
                    reset('client_name');
                    ClientNameInput.current.focus();
                }
            }
        });
    };

    const eliminar = (id, invoice_number) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar la factura "${invoice_number}"? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('invoices.destroy', id), {
                    onSuccess: () => {
                        Swal.fire('Eliminada!', `La factura "${invoice_number}" ha sido eliminada.`, 'success');
                    },
                    onError: () => {
                        Swal.fire('Error!', 'Hubo un problema al eliminar la factura.', 'error');
                    }
                });
            }
        });
    };

    const imprimir = (row) => {
        const printContent = `
            <div>
                <h3>Número de factura: ${row.original.invoice_number}</h3>
                <p>Transacción: ${row.original.sale.transaction_code}</p>
                <p>Medicamento: ${row.original.sale.medicine.name}</p>
                <p>Cantidad: ${row.original.sale.quantity}</p>
                <p>Fecha: ${row.original.sale.date}</p>
                <p>Cliente: ${row.original.client_name}</p>
                <p>Precio Total: ${row.original.total_amount}</p>
            </div>
        `;

        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Factura</title></head><body >');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };



    const columns = React.useMemo(
        () => [
            {
                Header: 'Número de factura',
                accessor: 'invoice_number',
                Cell: ({ value }) => <span className="font-bold">{value}</span>
            },

            {
                Header: 'Codigo de transacción',
                accessor: 'sale.transaction_code'
            },
            {
                Header: 'Medicamento',
                accessor: 'sale.medicine.name'
            },
            {
                Header: 'Cantidad',
                accessor: 'sale.quantity'
            },
            {
                Header: 'Fecha',
                accessor: 'sale.date'
            },
            {
                Header: 'Cliente',
                accessor: 'client_name'
            },

            {
                Header: 'Precio Total',
                accessor: 'total_amount',
            },
            {
                Header: 'Acciones',
                accessor: 'id',
                Cell: ({ row }) => (
                    <>
                    <div className="flex">
                        <Pencil
                            className="inline-block h-6 w-6 text-blue-500 mr-2 cursor-pointer"
                            onClick={() => openModal(2, row.original.id, row.original.invoice_number, row.original.sale, row.original.client_name)}
                        />
                        <Trash
                            className="inline-block h-6 w-6 text-red-500 cursor-pointer"
                            onClick={() => eliminar(row.original.id, row.original.invoice_number)}
                        />
                        <Printer
                            className="inline-block h-6 w-6 text-green-500 cursor-pointer"
                            onClick={() => imprimir(row)}
                        />
                    </div>
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
            data: invoices,
            initialState: { pageIndex: 0, pageSize: 5 }
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-1 flex justify-between items-center">
                            <h2 className="font-semibold text-lg sm:text-xl text-white leading-tight flex items-center">
                                <ReceiptEuro className="mr-2 text-sm sm:text-lg" /> Facturas
                            </h2>
                            <div className="flex">
                                <button
                                    className="hidden sm:inline-block bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 sm:px-4 rounded text-xs sm:text-base mr-2"
                                    onClick={() => openModal(1)}
                                >
                                    Crear Factura
                                </button>
                            </div>
                            <div className="sm:hidden">
                                <button
                                    className="bg-[#2E3447] hover:bg-blue-900 text-white font-bold py-2 px-3 rounded text-xs mr-2"
                                    onClick={() => openModal(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                }
            >
                <Head title="Facturas" />
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
                                placeholder="Buscar factura..."
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
                            <InputLabel for="sale" value="Venta" />
                            <select
                                id="sale"
                                name="sale"
                                ref={SaleSelect}
                                value={data.sale}
                                required="required"
                                onChange={(e) => setData('sale', e.target.value)}
                                className="mt-1 block w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300"
                            >
                                <option value="">Selecciona una venta</option>
                                {sales.map((sale) => (
                                    <option key={sale.id} value={sale.id}>
                                        {sale.transaction_code} 
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.sale} className="mt-2" />
                        </div>
                        <div className="mt-6">
                            <InputLabel for="client_name" value="Nombre del cliente" />
                            <TextInput
                                id="client_name"
                                name="client_name"
                                ref={ClientNameInput}
                                value={data.client_name}
                                icon={SquarePlus}
                                placeholder="Nombre del cliente"
                                required="required"
                                onChange={(e) => setData('client_name', e.target.value)}
                                className="mt-1 flex w-3/4 justify-center"
                            />
                            <InputError message={errors.client_name} className="mt-2" />
                        </div>
                        <div className="mt-6">
                            <PrimaryButton processing={processing} className="mt-2">
                                Guardar
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
