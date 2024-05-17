import { Link, Head } from '@inertiajs/react';
import { Factory, Pill, Layers, PackagePlus, PackageMinus, UserCog, FileDown, MonitorSmartphone  } from 'lucide-react';

export default function Welcome({ auth}) {
    return (
        <>
            <Head title="InvenMedPro" />
            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
                <header className="bg-blue-600 text-white p-6 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold">InvenMedPro</h1>
                        <nav className="space-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="hover:underline text-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hover:underline text-lg"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="hover:underline text-lg"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="flex-1 container mx-auto p-6">
                    <div class="bg-white px-6 py-12 text-center dark:bg-neutral-900 md:px-12 lg:text-left">
                        <div class="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                        <div class="grid items-center gap-12 lg:grid-cols-2">
                            <div class="mt-12 lg:mt-0">
                            <h1 class="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                                 <span className='text-blue-600'>InvenMedPro</span><br /><span class="text-primary">el software de gestión de inventario médico para tu empresa</span>
                            </h1>
                            <a class="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-blue-600 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                                data-te-ripple-init data-te-ripple-color="light" href="/register" role="button">Empezar</a>
                            <a class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-800 dark:hover:bg-opacity-60"
                                data-te-ripple-init data-te-ripple-color="light" href="/" role="button">Aprender más</a>
                            </div>
                            <div class="mb-12 lg:mb-0">
                            <img src="/stock.svg"
                                class="w-full rounded-lg shadow-lg dark:shadow-black/20" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                    <div class="max-w-[700px] text-center">
                        <p class="mb-6 font-bold uppercase text-primary dark:text-primary-400">
                        Funcionalidades
                        </p>
                        <h2 class="mb-22 text-3xl font-bold">¿Por qué es tan <span className='text-blue-600'>genial?</span></h2>
                        <p class="mb-16 text-gray-600 font-bold dark:text-neutral-300">
                        </p>
                    </div>
                    </div>

                    <div class="grid gap-x-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <Factory size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Gestión de Proveedores</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Permite agregar, editar y eliminar proveedores, así como almacenar detalles del proveedor y sistema de mapa
                            </p>
                        </div>
                        </div>
                    </div>
                    {/* Factory, Pill, Layers, PackagePlus, PackageMinus, UserCog, FileDown, MonitorSmartphone  */}
                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <Pill size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Catálogo de Medicamentos</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Gestión completa de los medicamentos, incluyendo numero de lote, precio de compra y venta y mas detalles
                            </p>
                        </div>
                        </div>
                    </div>

                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <Layers size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Clasificación por Categorías</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Organización de medicamentos en diferentes categorías para una búsqueda y gestión más eficiente.
                            </p>
                        </div>
                        </div>
                    </div>

                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <PackagePlus size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Control de Entrada de Stock</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Registro de nuevas adquisiciones de medicamentos, actualizando automáticamente los niveles de inventario.
                            </p>
                        </div>
                        </div>
                    </div>

                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <PackageMinus size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Control de Salida de Stock</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Monitoreo y registro de la salida de medicamentos del inventario, ya sea por ventas, donaciones o uso interno.
                            </p>
                        </div>
                        </div>
                    </div>

                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <UserCog size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Roles de Usuario</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Administración de diferentes roles de usuario con permisos específicos para acceder y manejar diferentes partes del sistem
                            </p>
                        </div>
                        </div>
                    </div>

                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <FileDown size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Exportación de Datos en CSV</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Funcionalidad para descargar datos de inventario, proveedores, y movimientos de stock en formato CSV para análisis externo.
                            </p>
                        </div>
                        </div>
                    </div>

                    <div class="mb-12">
                        <div class="flex">
                        <div class="shrink-0 text-blue-600">
                            <MonitorSmartphone size={24} />
                        </div>
                        <div class="ml-2 grow">
                            <p class="mb-1 font-bold">Interfaz Responsiva</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                            Diseño adaptable para su uso en dispositivos móviles, tabletas y computadoras, garantizando una experiencia de usuario óptima en cualquier dispositivo.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="container my-24 mx-auto md:px-6">

                    <section class="mb-32 text-center">
                        <h2 class="mb-12 text-3xl font-bold">Testimonios</h2>

                        <div class="grid gap-x-6 md:grid-cols-3 xl:gap-x-12">
                        <div class="mb-6 lg:mb-0">
                            <div
                            class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                                <img src="farmacia1.webp" class="w-full rounded-t-lg" />
                                <a href="#!">
                                <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"></div>
                                </a>
                                <svg class="absolute left-0 bottom-0 text-white dark:text-neutral-700" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320">
                                <path fill="currentColor"
                                    d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                                </path>
                                </svg>
                            </div>
                            <div class="p-6">
                                <h5 class="mb-2 text-lg font-bold">Farmacia de l'Aigua</h5>
                                <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
                                Testimonio de Juan Pérez, Gerente de Inventario:
                                </h6>
                                <ul class="mb-6 flex justify-center">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m480 757 157 95-42-178 138-120-182-16-71-168v387ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                </ul>
                                <p>
                                "La interfaz responsiva y la capacidad de acceder al sistema desde cualquier dispositivo han sido un cambio total para nosotros. Ahora podemos gestionar nuestro inventario incluso cuando estamos fuera de la farmacia. La integración con nuestro sistema de ventas también ha sido perfecta, lo que ha mejorado nuestra eficiencia operativa y la satisfacción del cliente."
                                </p>
                            </div>
                            </div>
                        </div>

                        <div class="mb-6 lg:mb-0">
                            <div
                            class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                                <img src="farmacia2.webp" class="w-full rounded-t-lg" />
                                <a href="#!">
                                <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"></div>
                                </a>
                                <svg class="absolute left-0 bottom-0 text-white dark:text-neutral-700" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320">
                                <path fill="currentColor"
                                    d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                                </path>
                                </svg>
                            </div>
                            <div class="p-6">
                                <h5 class="mb-2 text-lg font-bold">Farmacia Principal 124</h5>
                                <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
                                Testimonio de Ana Gómez, Propietaria:
                                </h6>
                                <ul class="mb-6 flex justify-center">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                </ul>
                                <p>
                                "La interfaz responsiva y la capacidad de acceder al sistema desde cualquier dispositivo han sido un cambio total para nosotros. Ahora podemos gestionar nuestro inventario incluso cuando estamos fuera de la farmacia. La integración con nuestro sistema de ventas también ha sido perfecta, lo que ha mejorado nuestra eficiencia operativa y la satisfacción del cliente. ¡Estamos muy satisfechos con este sistema!"
                                </p>
                            </div>
                            </div>
                        </div>

                        <div class="">
                            <div
                            class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                                <img src="farmacia4.webp" class="w-full rounded-t-lg" />
                                <a href="#!">
                                <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed"></div>
                                </a>
                                <svg class="absolute left-0 bottom-0 text-white dark:text-neutral-700" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320">
                                <path fill="currentColor"
                                    d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                                </path>
                                </svg>
                            </div>
                            <div class="p-6">
                                <h5 class="mb-2 text-lg font-bold">Farmacia Mateu</h5>
                                <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
                                Testimonio de Carlos Ramírez, Encargado de Compras:
                                </h6>
                                <ul class="mb-6 flex justify-center">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                                    <path fill="currentColor"
                                        d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z" />
                                    </svg>
                                </li>
                                </ul>
                                <p>
                                "La gestión de proveedores y el control de lotes y vencimientos han sido fundamentales para nuestra farmacia. Ahora podemos asegurarnos de que siempre tengamos medicamentos frescos y en buen estado, evitando pérdidas por productos caducados. El dashboard con gráficos claros nos permite tener una visión inmediata del estado del inventario"
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>
                    
                    </div>
                </main>

                <footer className="bg-gray-900 text-white py-6">
                    <div className="container mx-auto text-center">
                        <p>© 2024 InvenMedPro.</p>
                        <p>Creado por MrOscarDev con Laravel y React</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
