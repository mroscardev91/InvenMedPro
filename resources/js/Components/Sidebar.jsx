import React, { useState } from 'react';
import { FiMenu, FiHome, FiInbox, FiUser, FiCalendar, FiSearch, FiBarChart2, FiFolder, FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-blue-500 p-5 pt-8">
            <div className="flex items-center mb-8">
                <span className="text-white text-2xl font-bold">InvenMedPro</span>
            </div>
            <ul>
                <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md">
                    <FiHome />
                    <span className="ml-2">Dashboard</span>
                </li>
                <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md">
                    <FiInbox />
                    <span className="ml-2">Pacientes</span>
                </li>
                <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md" onClick={toggleDropdown}>
                    <FiFolder />
                    <span className="ml-2">Gestión de Productos</span>
                    {isDropdownOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                </li>
                {isDropdownOpen && (
                    <ul>
                        <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md pl-6">
                            <FiFolder />
                            <span className="ml-2">Categorías</span>
                        </li>
                        <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md pl-6">
                            <FiFolder />
                            <span className="ml-2">Productos</span>
                        </li>
                        <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md pl-6">
                            <FiFolder />
                            <span className="ml-2">Proveedores</span>
                        </li>
                    </ul>
                )}
                <li className="flex items-center text-white text-sm cursor-pointer p-2 hover:bg-blue-700 rounded-md">
                    <FiUser />
                    <span className="ml-2">Usuarios</span>
                </li>
            </ul>
        </div>
    );
};

