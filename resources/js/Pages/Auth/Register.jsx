import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { TextInput } from '@tremor/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, LockKeyhole, SquareUserRound } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 flex w-full justify-center"
                        icon={SquareUserRound}
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Nombre"  
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 flex w-full justify-center"
                        autoComplete="username"
                        icon={Mail}
                        placeholder="Correo Electrónico"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        icon={LockKeyhole}
                        className="mt-1 flex w-full justify-center"
                        autoComplete="new-password"
                        placeholder="Contraseña"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        icon={LockKeyhole}
                        className="mt-1 flex w-full justify-center"
                        autoComplete="new-password"
                        placeholder="Confirmar Contraseña"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        ¿Ya registrado?         
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrarse
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
