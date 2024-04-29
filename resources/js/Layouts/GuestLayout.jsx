import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-blue-500"> 
            <div className="flex items-center"> 
                <h1 className="text-white text-4xl font-bold">InvenMedPro</h1> 
                <Link href="/">
                    <ApplicationLogo className="w-28 h-28 text-white fill-current" /> 
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
