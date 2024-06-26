import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Sidebar, { SidebarItem } from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { LayoutDashboard, UsersRound, Pill, Factory, FolderHeart, ClipboardPlus, FolderKanban, CircleUser, PackagePlus, PackageMinus, Package, ReceiptEuro, UserCog } from "lucide-react";


export default function AuthenticatedLayout({ user, header, children}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex h-screen flex-shrink-0">
                <div className=""> 
                    <Sidebar user={user} >
                        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" route={"/dashboard"} active={location.pathname === "/dashboard"} />
                        <SidebarItem icon={<FolderHeart  size={20} />} text="Gestión de Medicamentos" active={(location.pathname === "/dashboard/categories") || (location.pathname === "/dashboard/suppliers") || (location.pathname === "/dashboard/medicines") } >
                            <SidebarItem icon={<ClipboardPlus size={16} />} text="Categorías" route="/dashboard/categories" active={location.pathname === "/dashboard/categories"}/>
                            <SidebarItem icon={<Pill size={16} />} text="Medicamentos" route="/dashboard/medicines" active={location.pathname === "/dashboard/medicines"}/>
                            <SidebarItem icon={<Factory size={16} />} text="Proveedores" route="/dashboard/suppliers" active={location.pathname === "/dashboard/suppliers"}/>
                        </SidebarItem>

                        <SidebarItem icon={<FolderKanban size={20} />} text="Gestión de Existencias" active={(location.pathname === "/dashboard/entries") || (location.pathname === "/dashboard/sales") || (location.pathname === "/dashboard/stock")} >
                            <SidebarItem icon={<PackagePlus  size={16} />} text="Entradas" route="/dashboard/entries" active={location.pathname === "/dashboard/entries"}/>
                            <SidebarItem icon={<PackageMinus size={16} />} text="Salidas" route="/dashboard/sales" active={location.pathname === "/dashboard/sales"}/>
                            <SidebarItem icon={<Package size={16} />} text="Stock" route="/dashboard/stock" active={location.pathname === "/dashboard/stock"}/>
                        </SidebarItem>

                        <SidebarItem icon={<ReceiptEuro size={20} />} text="Facturas" route={"/dashboard/invoices"} active={location.pathname === "/dashboard/invoices"}/>

                        <hr className="my-3" />
                        <SidebarItem icon={<UserCog size={20} />} text="Gestionar Usuarios" route={"/dashboard/users"} active={location.pathname === "/dashboard/users"} />
                    </Sidebar>
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                    <nav className="bg-white border-b border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link href="/dashboard">
                                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                        </Link>
                                    </div>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex justify-center items-center">
                                        <Link href={route('dashboard')} active={route().current('dashboard')} className={`text-xl font-bold text-blue-600 overflow-hidden transition-all duration-500 ease-in-out`}>
                                            Sistema de inventario de medicamentos
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:items-center sm:ms-6">
                                    <div className="ms-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <CircleUser className="w-7 h-7 me-2 rounded-md text-blue-700" /> 
                                                        {user.name}
                                                        
                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Cerrar Sesion
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="-me-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>
                            <div className="pt-4 pb-1 border-t border-gray-200">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">{user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{user.email}</div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Cerrar Sesion
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {header && (
                        <header className="bg-blue-600 shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                        </header>
                    )}
                    <main className="p-4 sm:p-6 md:px-8 lg:px-10 xl:px-12 flex-1 overflow-y-auto">
                        {children}
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
}   