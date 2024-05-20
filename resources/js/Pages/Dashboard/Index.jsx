import React from 'react';
import { ClipboardPlus, Pill, Factory, PackagePlus, PackageMinus, Package, UserCog, UserRoundPlus, Euro, Wallet, BadgeEuro, LayoutDashboard } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { Card, DonutChart, Legend, BarChart } from '@tremor/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth, categoriesCount, medicinesCount, suppliersCount, entriesCount, salesCount, stockCount, systemAdminsCount, inventoryAdminsCount, totalSalesAmount, totalPurchasesAmount, benefit, topMedicines, topSuppliers }) => {
    
    
    const chartDataDonut = topMedicines.map(medicine => ({
        name: medicine.name,
        sales: parseInt(medicine.total_sold),
    }));

    const categoriesDonut = chartDataDonut.map(item => item.name);

    // Preparar datos para el BarChart
    const barChartData = topSuppliers.map(supplier => ({
        name: supplier.name,
        'Número de medicamentos comprados': supplier.total_purchased,
    }));
      
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-1 flex justify-between items-center">
                            <h2 className="font-semibold text-lg sm:text-xl text-white leading-tight flex items-center">
                                <LayoutDashboard className="mr-2 text-sm sm:text-lg" /> Dashboard
                            </h2>
                        </div>
                    </div>
                }
            >
                <Head title="Dashboard" />
                <div className="overflow-x-auto">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="blue"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-blue-100 p-3 rounded mr-4">
                                <ClipboardPlus className="text-blue-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Categorías</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{categoriesCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="green"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-green-100 p-3 rounded mr-4">
                                <Pill className="text-green-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Medicamentos</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{medicinesCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="yellow"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-yellow-100 p-3 rounded mr-4">
                                <Factory className="text-yellow-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Proveedores</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{suppliersCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="rose"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-rose-100 p-3 rounded mr-4">
                                <PackagePlus className="text-rose-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Existencia comprada</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{entriesCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="pink"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-pink-100 p-3 rounded mr-4">
                                <PackageMinus className="text-pink-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Existencia vendida</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{salesCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="violet"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-violet-100 p-3 rounded mr-4">
                                <Package className="text-violet-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Stock Total</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{stockCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="stone"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-stone-100 p-3 rounded mr-4">
                                <UserCog className="text-stone-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Administradores del sistema</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{systemAdminsCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="gray"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-gray-100 p-3 rounded mr-4">
                                <UserRoundPlus className="text-gray-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Administradores del inventario</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{inventoryAdminsCount}</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="lime"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-lime-100 p-3 rounded mr-4">
                                <Wallet className="text-lime-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Importe Vendido</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{totalSalesAmount}€</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="emerald"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-emerald-100 p-3 rounded mr-4">
                                <Euro className="text-emerald-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Importe Comprado</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{totalPurchasesAmount}€</p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="max-w-xs flex items-center p-4"
                            decoration="top"
                            decorationColor="teal"
                            boxShadow="tremor-shadow-card"
                        >
                            <div className="flex items-center h-full bg-teal-100 p-3 rounded mr-4">
                                <BadgeEuro className="text-teal-500" size={48} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">Beneficio</p>
                                <div className="mt-2 flex items-baseline space-x-2.5">
                                    <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{benefit}€</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="mb-8 mt-8">
                        <h3 className="text-2xl font-semibold text-center mb-8">Medicamentos Más Vendidos</h3>
                        <div className="flex items-center justify-center space-x-6">
                            <DonutChart
                                data={chartDataDonut}
                                category="sales"
                                index="name"
                                colors={['blue', 'cyan', 'indigo', 'violet', 'orange']}
                                className="w-40"
                            />
                            <Legend
                                categories={categoriesDonut}
                                colors={['blue', 'cyan', 'indigo', 'violet', 'orange']}
                                className="max-w-xs"
                            />
                        </div>

                        <div className="mb-8 mt-8">
                        <h3 className="text-2xl font-semibold text-center mb-8">Proveedores Más Activos</h3>
                        <BarChart
                            className="mt-6"
                            data={barChartData}
                            index="name"
                            categories={['Número de medicamentos comprados']}
                            colors={['rose']}
                            yAxisWidth={48}
                        />
                    </div>
                    </div>

                    
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
