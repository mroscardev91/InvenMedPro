import { ChevronFirst, ChevronLast, CirclePlus, CircleMinus, CircleUser } from "lucide-react"
import { createContext, useContext, useState } from "react"
import { Link } from '@inertiajs/react';
import logo from "../../../public/invenmedpro.svg"

const SidebarContext = createContext();

export default function Sidebar({ children, user }) {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <h1 className={`text-xl font-bold text-blue-600 overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "w-auto" : "w-0 opacity-0"}`}>InvenMedPro</h1>
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>
                    <Link href={route('profile.edit')}>
                        <div className="border-t flex p-3 justify-center">
                            <CircleUser className="w-7 h-7 rounded-md text-blue-700" /> 
                            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                                <div className="leading-4">
                                    <h4 className="font-semibold">{user.name}</h4>
                                    <span className="text-xs text-gray-600">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ icon, text, active, alert, route, children }) {
    const { expanded } = useContext(SidebarContext);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleItemClick = () => {
        if (!route) {
            setIsSubMenuOpen(!isSubMenuOpen);
        }
    };

    return (
        <>
            <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800" : "hover:bg-blue-50 text-gray-600"}`} onClick={handleItemClick}>
                {icon}
                {route ? <Link href={route} className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</Link> : <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>}
                {children && (isSubMenuOpen ? <CircleMinus size={16} /> : <CirclePlus size={16} />)}
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-blue-500 ${expanded ? "" : "top-2"}`}>
                    </div>
                )}

                {!expanded && (
                    <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-20`}>
                        <Link href={route} className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</Link>
                    </div>
                )}
            </li>
            {isSubMenuOpen && children && (
                <div className="ml-4">
                    {children}
                </div>
            )}
        </>
    );
}